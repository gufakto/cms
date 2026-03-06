package domain

import (
	"time"

	"gorm.io/gorm"
)

type Role struct {
	ID          int64          `gorm:"id"`
	Name        string         `gorm:"name"`
	Description string         `gorm:"description"`
	Type        string         `gorm:"'type'"`
	CreatedAt   time.Time      `gorm:"created_at"`
	UpdatedAt   time.Time      `gorm:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index"`
}
