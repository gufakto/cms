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
// @Param limit query int  false  "10"  Format(limit)
// @Param page query int  false  "1"  Format(page)
// @Security BearerAuth
// @Success 200 {object} dto.ResponsePaginate[[]dto.UserData]
// @Failure 500 {object} dto.Response
// @Failure 401 {object} dto.Response
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
	users, err := api.userService.GetPaginate(ctx.Context(), page, limit)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(dto.Response{
			Status:  fiber.StatusInternalServerError,
			Message: err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(dto.ResponsePaginate[[]dto.UserData]{
		Status: fiber.StatusOK,
		Limit:  limit,
		Page:   page,
		Total:  len(users),
		Data:   users,
	})
}

// @Tags User
// @Summary User Create
// @Description User Create
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param project body dto.UserReq true "Data User"
// @Success 200 {object} dto.ResponseData[dto.UserData]
// @Failure 400 {object} dto.Response
// @Failure 401 {object} dto.Response
// @Failure 500 {object} dto.Response
// @Router /admin/user [post]
func (api userApi) Create(ctx *fiber.Ctx) error {
	var userReq dto.UserReq
	if err := ctx.BodyParser(&userReq); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(dto.Response{
			Status:  fiber.StatusBadRequest,
			Message: err.Error(),
		})
	}

	if err := userReq.Validate(); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(dto.Response{
			Status:  fiber.StatusBadRequest,
			Message: err.Error(),
		})
	}

	res, err := api.userService.Create(ctx.Context(), &userReq)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(dto.Response{
			Status:  fiber.StatusInternalServerError,
			Message: err.Error(),
		})
	}

	return ctx.Status(fiber.StatusCreated).JSON(dto.ResponseData[dto.UserData]{
		Status: fiber.StatusOK,
		Data:   res,
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
// @Success 200 {object} dto.ResponseData[dto.UserData]
// @Failure 500 {object} dto.Response
// @Failure 401 {object} dto.Response
// @Failure 400 {object} dto.Response
// @Router /admin/user/{id} [put]
func (api userApi) Update(ctx *fiber.Ctx) error {
	var userReq dto.UserUpdateReq
	if err := ctx.BodyParser(&userReq); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(dto.Response{
			Status:  fiber.StatusBadRequest,
			Message: err.Error(),
		})
	}

	if err := userReq.Validate(); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(dto.Response{
			Status:  fiber.StatusBadRequest,
			Message: err.Error(),
		})
	}

	id, err := strconv.Atoi(ctx.Params("id"))
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(dto.Response{
			Status:  fiber.StatusBadRequest,
			Message: err.Error(),
		})
	}

	res, err := api.userService.Update(ctx.Context(), userReq, int64(id))
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(dto.Response{
			Status:  fiber.StatusInternalServerError,
			Message: err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(dto.ResponseData[dto.UserData]{
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
// @Success 204 {object} dto.Response
// @Failure 400 {object} dto.Response
// @Failure 401 {object} dto.Response
// @Failure 500 {object} dto.Response
// @Router /admin/user/{id} [delete]
func (api userApi) Delete(ctx *fiber.Ctx) error {
	id, err := strconv.Atoi(ctx.Params("id"))
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(dto.Response{
			Status:  fiber.StatusBadRequest,
			Message: err.Error(),
		})
	}
	err = api.userService.Delete(ctx.Context(), int64(id))
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(dto.Response{
			Status:  fiber.StatusInternalServerError,
			Message: err.Error(),
		})
	}
	return ctx.Status(fiber.StatusNoContent).JSON(dto.Response{
		Status:  fiber.StatusNoContent,
		Message: "success",
	})
}

// @Tags User
// @Summary User Detail
// @Description User Detail
// @Accept json
// @Produce json
// @Security BearerAuth
// @Success 200 {object} dto.ResponseData[dto.UserData]
// @Failure 400 {object} dto.Response
// @Failure 401 {object} dto.Response
// @Failure 500 {object} dto.Response
// @Router /admin/user/{id} [get]
func (api userApi) GetByID(ctx *fiber.Ctx) error {
	id, err := strconv.Atoi(ctx.Params("id"))
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(dto.Response{
			Status:  fiber.StatusBadRequest,
			Message: err.Error(),
		})
	}
	user, err := api.userService.GetByID(ctx.Context(), int64(id))
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(dto.Response{
			Status:  fiber.StatusInternalServerError,
			Message: err.Error(),
		})
	}
	return ctx.Status(fiber.StatusOK).JSON(dto.ResponseData[dto.UserData]{
		Status: fiber.StatusOK,
		Data:   user,
	})
}
