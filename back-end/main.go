package main

import (
	"errors"
	"log"
	"net/http"
	"strconv"
	"time"

	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Memo struct {
	ID        uint      `json:"id"          gorm:"primarykey"`
	CreatedAt time.Time `json:"created_at"  gorm:"not null"`
	Title     string    `json:"title"       gorm:"size:255;not null" `
	Detail    string    `json:"detail"      gorm:"type:text;not null" `
}

func main() {
    e := echo.New()

    e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowOrigins: []string{"http://localhost:3000"},
        AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE, echo.PATCH},
        AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
    }))

    dsn := "host=/tmp user=root dbname=memo sslmode=disable"
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }else{
        log.Println("✅Success to connect db💻");
    }

    db.AutoMigrate(&Memo{})

    e.POST("/memo/upload", func(c echo.Context) error{
        var newMemo Memo
        if err := c.Bind(&newMemo); err !=nil {
            return echo.NewHTTPError(http.StatusBadRequest, err.Error())
        }
        if result := db.Create(&newMemo); err != nil {
            return echo.NewHTTPError(http.StatusInternalServerError, result.Error.Error())
        }
        return c.JSON(http.StatusCreated, newMemo)
    })

    e.GET("/memos", func(c echo.Context) error {
        var memos []Memo
        if result := db.Find(&memos); result.Error !=nil {
            return echo.NewHTTPError(http.StatusInternalServerError, result.Error.Error())
        }
        return c.JSON(http.StatusOK, memos)
    })

    e.GET("/memos/:id", func(c echo.Context) error {
        id := c.Param("id")
        var memo Memo
    
        var uintID uint
        if parsedID, err := strconv.ParseUint(id, 10, 32); err != nil {
            return echo.NewHTTPError(http.StatusBadRequest, "Invalid memo ID")
        } else {
            uintID = uint(parsedID)
        }
    
        result := db.First(&memo, uintID)
        if result.Error != nil {
            if errors.Is(result.Error, gorm.ErrRecordNotFound) {
                return echo.NewHTTPError(http.StatusNotFound, "Memo not found")
            }
            return echo.NewHTTPError(http.StatusInternalServerError, result.Error.Error())
        }
    
        return c.JSON(http.StatusOK, memo)
    })

    e.PATCH("/memos/:id", func(c echo.Context) error {
        idParam := c.Param("id")
        var uintID uint
        var parsedID uint64
        var err error
        if parsedID, err = strconv.ParseUint(idParam, 10, 32); err != nil {
            return echo.NewHTTPError(http.StatusBadRequest, "Invalid memo ID")
        }
        uintID = uint(parsedID)
    
        var updateData Memo
        if err := c.Bind(&updateData); err != nil {
            return echo.NewHTTPError(http.StatusBadRequest, err.Error())
        }
    
        var memo Memo
        if result := db.First(&memo, uintID); result.Error != nil {
            return echo.NewHTTPError(http.StatusNotFound, "Memo not found")
        }
    
        result := db.Model(&memo).Updates(updateData)
        if result.Error != nil {
            return echo.NewHTTPError(http.StatusInternalServerError, result.Error.Error())
        }
    
        return c.JSON(http.StatusOK, memo)
    })

    e.DELETE("memos/:id", func(c echo.Context) error{
        idParam := c.Param("id")
        var uintID uint
        var parsedID uint64
        var err error
        if parsedID, err = strconv.ParseUint(idParam, 10, 32); err !=nil {
            return echo.NewHTTPError(http.StatusBadRequest, "Invalid memo ID")
        }
        uintID = uint(parsedID)

        result := db.Delete(&Memo{}, uintID)
        if result.Error != nil{
            if errors.Is(result.Error, gorm.ErrRecordNotFound) {
                return echo.NewHTTPError(http.StatusNotFound, "Memo not found")
            }
            return echo.NewHTTPError(http.StatusInternalServerError, result.Error.Error())
        }
        return c.JSON(http.StatusOK, map[string]string{"message": "Memo deleted successfully"})
    })
    
    e.Logger.Fatal(e.Start(":1323"))
}
