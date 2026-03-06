package domain

import "gorm.io/gorm"

type RoleMenu struct {
	ID        int64          `gorm:"id"`
	RoleID    int64          `gorm:"role_id"`
	MenuID    int64          `gorm:"menu_id"`
	CreatedAt string         `gorm:"created_at"`
	UpdatedAt string         `gorm:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index"`
}
