package main

import (
	"log"
	"my-memo-backend/db"
	"my-memo-backend/models"
	"my-memo-backend/router"

	_ "github.com/lib/pq"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)



func main() {
    e := echo.New()

    e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowOrigins: []string{"http://localhost:3000"},
        AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE, echo.PATCH},
        AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
    }))

    dsn := "host=/tmp user=root dbname=memo sslmode=disable"
    database, err := db.InitDB(dsn)
    if err != nil {
        panic("failed to connect database")
    }else{
        log.Println("✅Success to connect db💻");
    }

    database.AutoMigrate(&models.Memo{})
    database.AutoMigrate(&models.User{})

    router.MemoRegisterRoutes(e, database)
    router.UserRegisterRoutes(e, database)
    
    e.Logger.Fatal(e.Start(":1323"))
}
