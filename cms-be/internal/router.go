package internal

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gufakto/cms/internal/api"
	"github.com/gufakto/cms/internal/config"
	"github.com/gufakto/cms/internal/middleware"
)

func InitRouter(router *fiber.App, cnf *config.Config, container *Container) {
	authMid := middleware.Authenticate(cnf)

	v1 := router.Group("/api/v1")

	admin := v1.Group("/admin")
	userApi := api.NewUser(container.userService)
	admin.Get("/user", authMid, userApi.GetAll)
	admin.Post("/user", authMid, userApi.Create)
	admin.Put("/user/:id", authMid, userApi.Update)
	admin.Delete("/user/:id", authMid, userApi.Delete)
	admin.Get("/user/:id", authMid, userApi.GetByID)

	auth := v1.Group("/auth")
	authApi := api.NewAuth(container.authService)
	auth.Post("/login", authApi.Login)
	auth.Post("/refresh-token", authApi.RefreshToken)
}
