package service

import (
	"context"
	"fmt"
	"time"

	"github.com/gufakto/cms/domain"
	"github.com/gufakto/cms/dto"
	"github.com/gufakto/cms/internal/repository"
	"golang.org/x/crypto/bcrypt"
)

type userService struct {
	userRepo repository.UserRepository
}

type UserService interface {
	GetPaginate(ctx context.Context, page int, limit int) ([]dto.UserData, error)
	Create(ctx context.Context, user *dto.UserReq) (dto.UserData, error)
	Update(ctx context.Context, user dto.UserUpdateReq, id int64) (dto.UserData, error)
	Delete(ctx context.Context, id int64) error
	GetByID(ctx context.Context, id int64) (dto.UserData, error)
}

func NewUser(userRepo repository.UserRepository) UserService {
	return &userService{
		userRepo: userRepo,
	}
}

// Create implements domain.UserService.
func (u *userService) Create(ctx context.Context, user *dto.UserReq) (dto.UserData, error) {
	hasPass, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 12)
	userDataSet := domain.User{
		Name:      user.Name,
		Email:     user.Email,
		Password:  string(hasPass),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	err := u.userRepo.Create(ctx, &userDataSet)
	if err != nil {
		return dto.UserData{}, err
	}
	return dto.UserData{
		ID:        userDataSet.ID,
		Name:      userDataSet.Name,
		Email:     userDataSet.Email,
		CreatedAt: userDataSet.CreatedAt,
		UpdatedAt: userDataSet.UpdatedAt,
	}, nil
}

// Delete implements domain.UserService.
func (u *userService) Delete(ctx context.Context, id int64) error {
	dataset, err := u.userRepo.GetByID(ctx, id)
	if err != nil {
		return err
	}
	if dataset.ID == 0 {
		return fmt.Errorf("user not found")
	}
	return u.userRepo.Delete(ctx, id)
}

// GetByID implements domain.UserService.
func (u *userService) GetByID(ctx context.Context, id int64) (user dto.UserData, err error) {
	dataset, err := u.userRepo.GetByID(ctx, id)
	if err != nil {
		return dto.UserData{}, err
	}
	if dataset == (domain.User{}) {
		return dto.UserData{}, dto.ErrNoDataFound
	}
	return dto.UserData{
		ID:        dataset.ID,
		Name:      dataset.Name,
		Email:     dataset.Email,
		CreatedAt: dataset.CreatedAt,
		UpdatedAt: dataset.UpdatedAt,
	}, nil
}

// Update implements domain.UserService.
func (u *userService) Update(ctx context.Context, user dto.UserUpdateReq, id int64) (dto.UserData, error) {
	dataset, err := u.userRepo.GetByID(ctx, id)
	if err != nil {
		return dto.UserData{}, dto.ErrNoDataFound
	}
	dataset.Name = user.Name
	dataset.Email = user.Email
	dataset.UpdatedAt = time.Now()
	err = u.userRepo.Update(ctx, &dataset)
	if err != nil {
		return dto.UserData{}, err
	}
	return dto.UserData{
		ID:        dataset.ID,
		Name:      dataset.Name,
		Email:     dataset.Email,
		CreatedAt: dataset.CreatedAt,
		UpdatedAt: dataset.UpdatedAt,
	}, nil

}

// GetPaginate implements domain.UserService.
func (u *userService) GetPaginate(ctx context.Context, page int, limit int) ([]dto.UserData, error) {
	dataset, err := u.userRepo.GetPaginate(ctx, page, limit)
	fmt.Println(dataset)
	if err != nil {
		return []dto.UserData{}, err
	}
	var users []dto.UserData
	for item := range dataset {
		users = append(users, dto.UserData{
			ID:        dataset[item].ID,
			Name:      dataset[item].Name,
			Email:     dataset[item].Email,
			CreatedAt: dataset[item].CreatedAt,
			UpdatedAt: dataset[item].UpdatedAt,
		})
	}
	if users == nil {
		users = make([]dto.UserData, 0)
	}
	return users, nil
}
