package controllers

import (
	"my-memo-backend/models"
	"net/http"

	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func CreateUser(db * gorm.DB) echo.HandlerFunc{
	return func(c echo.Context) error{
		var newUser models.User
		if err := c.Bind(&newUser); err !=nil{
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
		if err != nil{
			return echo.NewHTTPError(http.StatusInternalServerError,"fail to hash password")
		}
		newUser.Password = string(hashedPassword)
		
		if result := db.Create(&newUser); result.Error != nil{
			return echo.NewHTTPError(http.StatusInternalServerError, result.Error.Error())
		}
		return c.JSON(http.StatusCreated, newUser)
	}
}