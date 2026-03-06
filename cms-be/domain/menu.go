package domain

import "gorm.io/gorm"

type Menu struct {
	ID          int64          `gorm:"id"`
	Name        string         `gorm:"name"`
	Description string         `gorm:"description"`
	ParentID    int64          `gorm:"parent_id"`
	CreatedAt   string         `gorm:"created_at"`
	UpdatedAt   string         `gorm:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index"`
}
