package models

import "time"

type User struct {
	ID       	 uint      `json:"id"             gorm:"primarykey"`
	CreatedAt    time.Time `json:"created_at"`
	UserName     string    `json:"userName"       gorm:"size:255;not null;unique" `
	Password   	 string    `json:"password"       gorm:"type:text;not null" `
}