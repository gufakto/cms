package repository

import (
	"context"

	"github.com/gufakto/cms/domain"
	"gorm.io/gorm"
)

type userRepository struct {
	db *gorm.DB
}

type UserRepository interface {
	GetPaginate(ctx context.Context, page int, limit int) ([]domain.User, error)
	Create(ctx context.Context, user *domain.User) error
	Update(ctx context.Context, user *domain.User) error
	Delete(ctx context.Context, id int64) error
	GetByID(ctx context.Context, id int64) (domain.User, error)
	GetByEmail(ctx context.Context, email string) (domain.User, error)
}

func NewUser(db *gorm.DB) UserRepository {
	return &userRepository{
		db: db,
	}
}

// Create implements domain.UserRepository.
func (u *userRepository) Create(ctx context.Context, user *domain.User) error {
	res := u.db.WithContext(ctx).Model(domain.User{}).Create(&user)
	if res.Error != nil {
		return res.Error
	}
	return nil
}

// Delete implements domain.UserRepository.
func (u *userRepository) Delete(ctx context.Context, id int64) error {
	err := u.db.WithContext(ctx).Model(&domain.User{}).Where("id=?", id).Delete(&domain.User{}).Error
	return err
}

// GetByID implements domain.UserRepository.
func (u *userRepository) GetByID(ctx context.Context, id int64) (dataset domain.User, err error) {
	ex := u.db.WithContext(ctx).Where("id = ?", id).FirstOrInit(&dataset)
	return dataset, ex.Error
}

// Update implements domain.UserRepository.
func (u *userRepository) Update(ctx context.Context, user *domain.User) error {
	ex := u.db.WithContext(ctx).Save(user)
	return ex.Error
}

// GetPaginate implements domain.UserRepository.
func (u *userRepository) GetPaginate(ctx context.Context, page int, limit int) (users []domain.User, err error) {
	offset := (page - 1) * limit
	err = u.db.WithContext(ctx).Limit(limit).Offset(offset).Find(&users).Error
	return
}

// GetByEmail implements domain.UserRepository.
func (u *userRepository) GetByEmail(ctx context.Context, email string) (dataset domain.User, err error) {
	ex := u.db.WithContext(ctx).Where("email = ?", email).FirstOrInit(&dataset)
	return dataset, ex.Error
}
