package controllers

import (
	"fmt"
	"my-memo-backend/models"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt"
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

func LoginUser(db *gorm.DB) echo.HandlerFunc {
    return func(c echo.Context) error {
        var loginRequest struct {
            UserName string `json:"userName"`
            Password string `json:"password"`
        }

        if err := c.Bind(&loginRequest); err != nil {
            return echo.NewHTTPError(http.StatusBadRequest, "Invalid request")
        }

        var user models.User
        result := db.Where("user_name = ?", loginRequest.UserName).First(&user)
        if result.Error != nil {
            return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials")
        }

        if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginRequest.Password)); err != nil {
            return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials")
        }

        user.Password = ""

        return c.JSON(http.StatusOK, user)
    }
}

