package internal

import (
	"github.com/gufakto/cms/internal/config"
	"github.com/gufakto/cms/internal/repository"
	"github.com/gufakto/cms/internal/service"
)

type Container struct {
	cnf         *config.Config
	userService service.UserService
	authService service.AuthService
}

func NewContainer(cnf *config.Config) *Container {
	// CONNECTION & MIGRATION
	dbConnection := config.NewDatabasePG(cnf)
	config.RunMigration()

	// REPOSITORY
	userRepository := repository.NewUser(dbConnection)

	// SERVICES
	userService := service.NewUser(userRepository)
	authService := service.NewAuth(userRepository)

	return &Container{
		userService: userService,
		authService: authService,
	}
}
