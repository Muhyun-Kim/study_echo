package main

import (
	"log"
	"net/http"
	"time"

	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Memo struct {
	ID        uint      `gorm:"primarykey" json:"id"`
	CreatedAt time.Time `gorm:"not null" json:"created_at"`
	Title     string    `gorm:"size:255;not null" json:"title"`
	Detail    string    `gorm:"type:text;not null" json:"detail"`
}

func main() {
    e := echo.New()

    e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowOrigins: []string{"http://localhost:3000"},
        AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
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
    

    e.GET("/memos", func(c echo.Context) error {
        var memos []Memo
        if result := db.Find(&memos); result.Error !=nil {
            return echo.NewHTTPError(http.StatusInternalServerError, result.Error.Error())
        }
        return c.JSON(http.StatusOK, memos)
    })

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
    
    e.Logger.Fatal(e.Start(":1323"))
}
