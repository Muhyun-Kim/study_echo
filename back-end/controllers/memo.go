package controllers

import (
	"errors"
	"my-memo-backend/models"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func GetMemos(db *gorm.DB) echo.HandlerFunc{
	return func(c echo.Context) error {
        var memos []models.Memo
        if result := db.Find(&memos); result.Error !=nil {
            return echo.NewHTTPError(http.StatusInternalServerError, result.Error.Error())
        }
        return c.JSON(http.StatusOK, memos)
    }
}

func UploadMemo(db * gorm.DB) echo.HandlerFunc{
	return func(c echo.Context) error{
        var newMemo models.Memo
        if err := c.Bind(&newMemo); err !=nil {
            return echo.NewHTTPError(http.StatusBadRequest, err.Error())
        }
        if result := db.Create(&newMemo); result.Error != nil {
            return echo.NewHTTPError(http.StatusInternalServerError, result.Error.Error())
        }
        return c.JSON(http.StatusCreated, newMemo)
    }
}

func GetMemo(db *gorm.DB) echo.HandlerFunc{
    return func(c echo.Context) error {
        id := c.Param("id")
        var memo models.Memo
    
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
    }
}

func PatchMemo(db *gorm.DB) echo.HandlerFunc{
    return func(c echo.Context) error {
        idParam := c.Param("id")
        var uintID uint
        var parsedID uint64
        var err error
        if parsedID, err = strconv.ParseUint(idParam, 10, 32); err != nil {
            return echo.NewHTTPError(http.StatusBadRequest, "Invalid memo ID")
        }
        uintID = uint(parsedID)
    
        var updateData models.Memo
        if err := c.Bind(&updateData); err != nil {
            return echo.NewHTTPError(http.StatusBadRequest, err.Error())
        }
    
        var memo models.Memo
        if result := db.First(&memo, uintID); result.Error != nil {
            return echo.NewHTTPError(http.StatusNotFound, "Memo not found")
        }
    
        result := db.Model(&memo).Updates(updateData)
        if result.Error != nil {
            return echo.NewHTTPError(http.StatusInternalServerError, result.Error.Error())
        }
    
        return c.JSON(http.StatusOK, memo)
    }
}

func DeleteMemo (db *gorm.DB) echo.HandlerFunc{
    return func(c echo.Context) error{
        idParam := c.Param("id")
        var uintID uint
        var parsedID uint64
        var err error
        if parsedID, err = strconv.ParseUint(idParam, 10, 32); err !=nil {
            return echo.NewHTTPError(http.StatusBadRequest, "Invalid memo ID")
        }
        uintID = uint(parsedID)

        result := db.Delete(&models.Memo{}, uintID)
        if result.Error != nil{
            if errors.Is(result.Error, gorm.ErrRecordNotFound) {
                return echo.NewHTTPError(http.StatusNotFound, "Memo not found")
            }
            return echo.NewHTTPError(http.StatusInternalServerError, result.Error.Error())
        }
        return c.JSON(http.StatusOK, map[string]string{"message": "Memo deleted successfully"})
    }
}