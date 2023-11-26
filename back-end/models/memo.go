package models

import "time"

type Memo struct {
	ID        uint      `json:"id"          gorm:"primarykey"`
	CreatedAt time.Time `json:"created_at"  gorm:"not null"`
	Title     string    `json:"title"       gorm:"size:255;not null" `
	Detail    string    `json:"detail"      gorm:"type:text;not null" `
}