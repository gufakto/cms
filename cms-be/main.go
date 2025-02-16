package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gufakto/cms/internal/api"
	"github.com/gufakto/cms/internal/component"
	"github.com/gufakto/cms/internal/config"
	"github.com/gufakto/cms/internal/middleware"
	"github.com/gufakto/cms/internal/repository"
	"github.com/gufakto/cms/internal/service"
)

func main() {
	// CONNECTION
	cnf := config.Get()
	dbConnection := component.ConnectDB(cnf)

	// REPOSITORY
	userRepository := repository.NewUser(dbConnection)

	// SERVICES
	userService := service.NewUser(userRepository)
	authService := service.NewAuth(userRepository)

	authMid := middleware.Authenticate(cnf)

	app := fiber.New()
	api.NewUser(app, userService, authMid)
	api.NewAuth(app, authService)

	app.Listen(cnf.Server.Host + ":" + cnf.Server.Port)
}
