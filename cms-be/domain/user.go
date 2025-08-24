package domain

import (
	"database/sql"
	"time"
)

type User struct {
	ID                 int64        `gorm:"id;primaryKey"`
	Name               string       `gorm:"name"`
	Email              string       `gorm:"email;unique"`
	Password           string       `gorm:"password"`
	ResetPasswordToken string       `gorm:"reset_password_token"`
	Blocked            bool         `gorm:"blocked"`
	CreatedAt          time.Time    `gorm:"created_at"`
	UpdatedAt          time.Time    `gorm:"updated_at"`
	DeletedAt          sql.NullTime `gorm:"deleted_at"`
}
