package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gufakto/cms/dto"
	"github.com/gufakto/cms/internal/service"
)

type authApi struct {
	authService service.AuthService
}

func NewAuth(authService service.AuthService) *authApi {
	return &authApi{
		authService: authService,
	}

}

// @Tags Auth
// @Summary Auth
// @Description Auth
// @Accept json
// @Produce json
// @Param project body dto.AuthReq true "Login Info"
// @Success 200 {object} dto.ResponseData“
// @Success 500 {object} dto.Response
// @Router /auth/login [post]
func (api *authApi) Login(ctx *fiber.Ctx) error {
	var loginReq dto.AuthReq
	if err := ctx.BodyParser(&loginReq); err != nil {
		return ctx.Status(fiber.StatusUnprocessableEntity).JSON(dto.Response{
			Message: err.Error(),
		})
	}

	if err := loginReq.Validate(); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(dto.Response{
			Message: err.Error(),
		})
	}

	res, err := api.authService.Login(loginReq)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(dto.Response{
			Message: err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(dto.ResponseData{
		Data: res,
	})
}

// @Tags Auth
// @Summary Refresh Token
// @Description Refresh Token login
// @Accept json
// @Produce json
// @Param project body dto.RefreshTokenReq true "Refresh token info"
// @Success 200 {object} dto.ResponseData
// @Success 500 {object} dto.Response
// @Router /auth/refresh-token [post]
func (api *authApi) RefreshToken(ctx *fiber.Ctx) error {
	var refToken dto.RefreshTokenReq
	if err := ctx.BodyParser(&refToken); err != nil {
		return ctx.Status(fiber.StatusUnprocessableEntity).JSON(dto.Response{
			Message: err.Error(),
		})
	}

	if err := refToken.Validate(); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(dto.Response{
			Message: err.Error(),
		})
	}

	res, err := api.authService.RefreshToken(refToken.RefreshToken)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(dto.Response{
			Message: err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(dto.ResponseData{
		Data: res,
	})
}
