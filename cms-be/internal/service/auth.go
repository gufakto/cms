package service

import (
	"context"

	"github.com/golang-jwt/jwt"
	"github.com/gufakto/cms/domain"
	"github.com/gufakto/cms/dto"
	"github.com/gufakto/cms/internal/config"
	"github.com/gufakto/cms/internal/repository"
	"github.com/gufakto/cms/internal/utils"
	"golang.org/x/crypto/bcrypt"
)

type authService struct {
	userRepo repository.UserRepository
}

type AuthService interface {
	Login(ctx context.Context, authReq dto.AuthReq) (dto.AuthRes, error)
	RefreshToken(ctx context.Context, token string) (dto.AuthRes, error)
}

func NewAuth(userRepo repository.UserRepository) AuthService {
	return &authService{
		userRepo: userRepo,
	}
}

// Login implements domain.AuthService.
func (a *authService) Login(ctx context.Context, authReq dto.AuthReq) (dto.AuthRes, error) {
	user, err := a.userRepo.GetByEmail(ctx, authReq.Email)
	if err != nil {
		return dto.AuthRes{}, err
	}

	if user == (domain.User{}) {
		return dto.AuthRes{}, dto.ErrAccountNotFound
	}
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(authReq.Password))
	if err != nil {
		return dto.AuthRes{}, dto.ErrAuthFailed
	}

	token, err := utils.GenerateTokenAndRefreshToken(user.Email)
	if err != nil {
		return dto.AuthRes{}, err
	}

	return dto.AuthRes{
		Token:        token.Token,
		RefreshToken: token.RefreshToken,
		User: dto.UserData{
			ID:    user.ID,
			Name:  user.Name,
			Email: user.Email,
		},
	}, nil
}

// RefreshToken implements domain.AuthService.
func (a *authService) RefreshToken(ctx context.Context, token string) (dto.AuthRes, error) {
	cnf := config.Get()
	var jwtSecretKey = []byte(cnf.Token.TokenKey)
	tokenRes, err := jwt.ParseWithClaims(token, &dto.CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtSecretKey, nil
	})
	if err != nil {
		return dto.AuthRes{}, err
	}

	if !tokenRes.Valid {
		return dto.AuthRes{}, dto.ErrInvalidToken

	}

	claims, ok := tokenRes.Claims.(*dto.CustomClaims)
	if !ok {
		return dto.AuthRes{}, dto.ErrInvalidToken
	}
	user, err := a.userRepo.GetByEmail(ctx, claims.Username)
	if err != nil {
		return dto.AuthRes{}, err
	}

	if user == (domain.User{}) {
		return dto.AuthRes{}, dto.ErrAccountNotFound
	}
	newToken, err := utils.GenerateToken(user.Email)

	if err != nil {
		return dto.AuthRes{}, err
	}

	if newToken == "" {
		return dto.AuthRes{}, dto.ErrFailedGenerateToken
	}

	return dto.AuthRes{
		Token:        newToken,
		RefreshToken: token,
		User: dto.UserData{
			ID:    user.ID,
			Name:  user.Name,
			Email: user.Email,
		},
	}, nil
}
