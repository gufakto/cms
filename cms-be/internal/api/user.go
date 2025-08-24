package api

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/gufakto/cms/dto"
	"github.com/gufakto/cms/internal/service"
)

type userApi struct {
	userService service.UserService
}

func NewUser(userService service.UserService) *userApi {
	return &userApi{
		userService: userService,
	}
}

// @Tags User
// @Summary Get list Users
// @Description Get List Data Users
// @Accept json
// @Produce json
// @Security BearerAuth
// @Success 200 {object} dto.Response
// @Success 500 {object} dto.Response
// @Router /admin/user [get]
func (api userApi) GetAll(ctx *fiber.Ctx) error {
	page, _ := strconv.Atoi(ctx.Query("page"))
	limit, _ := strconv.Atoi(ctx.Query("limit"))
	if page == 0 {
		page = 1
	}
	if limit == 0 {
		limit = 10
	}
	users, err := api.userService.GetPaginate(page, limit)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(dto.Response{
			Message: err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(users)
}

// @Tags User
// @Summary User Create
// @Description User Create
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param project body dto.UserReq true "Data User"
// @Success 200 {object} dto.ResponseData
// @Success 500 {object} dto.Response
// @Router /admin/user [post]
func (api userApi) Create(ctx *fiber.Ctx) error {
	var userReq dto.UserReq
	if err := ctx.BodyParser(&userReq); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(dto.Response{
			Message: err.Error(),
		})
	}

	if err := userReq.Validate(); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(dto.Response{
			Message: err.Error(),
		})
	}

	res, err := api.userService.Create(&userReq)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(dto.Response{
			Message: err.Error(),
		})
	}

	return ctx.Status(fiber.StatusCreated).JSON(dto.ResponseData{
		Data: res,
	})
}

// @Tags User
// @Summary User
// @Description User Update
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path int true "user id"
// @Param project body dto.UserUpdateReq true "payload user"
// @Success 200 {object} dto.Response
// @Success 500 {object} dto.Response
// @Router /admin/user/{id} [put]
func (api userApi) Update(ctx *fiber.Ctx) error {
	var userReq dto.UserUpdateReq
	if err := ctx.BodyParser(&userReq); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(dto.Response{
			Message: err.Error(),
		})
	}

	if err := userReq.Validate(); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(dto.Response{
			Message: err.Error(),
		})
	}

	id, err := strconv.Atoi(ctx.Params("id"))
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(dto.Response{
			Message: err.Error(),
		})
	}

	res, err := api.userService.Update(userReq, int64(id))
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(dto.Response{
			Message: err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(dto.ResponseData{
		Data: res,
	})
}

// @Tags User
// @Summary User Delete
// @Description User delete
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path int true "user id"
// @Success 200 {object} dto.Response
// @Success 500 {object} dto.Response
// @Router /admin/user/{id} [delete]
func (api userApi) Delete(ctx *fiber.Ctx) error {
	id, err := strconv.Atoi(ctx.Params("id"))
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(dto.Response{
			Message: err.Error(),
		})
	}
	err = api.userService.Delete(int64(id))
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(dto.Response{
			Message: err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(dto.Response{
		Message: "success",
	})
}

func (api userApi) GetByID(ctx *fiber.Ctx) error {
	id, err := strconv.Atoi(ctx.Params("id"))
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(dto.Response{
			Message: err.Error(),
		})
	}
	user, err := api.userService.GetByID(int64(id))
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(dto.Response{
			Message: err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(dto.ResponseData{
		Data: user,
	})
}
