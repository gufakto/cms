package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/swagger"
	"github.com/gufakto/cms/docs"
	"github.com/gufakto/cms/internal"
	"github.com/gufakto/cms/internal/config"
)

// @title CMS API Documentation
// @version 1.0
// @description This is a swagger for CMS API
// @termsOfService http://swagger.io/terms/
// @contact.name API Support
// @contact.email fiber@swagger.io
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @BasePath /api/v1
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
func main() {
	cnf := config.Get()
	app := fiber.New(fiber.Config{
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	})
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	docs.SwaggerInfo.Title = "TrackiCMSng API"
	docs.SwaggerInfo.Description = "This is an API server for CMS app."
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = cnf.Server.Host + ":" + cnf.Server.Port
	docs.SwaggerInfo.BasePath = "/api/v1"
	docs.SwaggerInfo.Schemes = []string{"http", "https"}

	container := internal.NewContainer(cnf)
	internal.InitRouter(app, cnf, container)

	// Swagger route
	app.Get("/", func(ctx *fiber.Ctx) error {
		return ctx.Redirect("http://"+cnf.Server.Host+":"+cnf.Server.Port+"/docs", http.StatusMovedPermanently)
	})

	app.Get("/docs/*", swagger.HandlerDefault)

	go func() {
		if err := app.Listen(cnf.Server.Host + ":" + cnf.Server.Port); err != nil && err != http.ErrServerClosed {
			log.Fatalf("shutting down the server: %v", err)
		}
	}()

	// Tunggu signal interrupt
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down servers..")

	// Deadline shutdown 5 detik
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := app.ShutdownWithContext(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exited properly.")
}
