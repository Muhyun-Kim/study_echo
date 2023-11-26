package router

import (
	"my-memo-backend/controllers"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func RegisterRoutes(e *echo.Echo, db *gorm.DB){
	e.GET("/memos", controllers.GetMemos(db))
	e.POST("/memo/upload", controllers.UploadMemo(db))
	e.GET("/memos/:id", controllers.GetMemo(db))
	e.PATCH("/memos/:id", controllers.PatchMemo(db))
	e.DELETE("memos/:id", controllers.DeleteMemo(db))
}