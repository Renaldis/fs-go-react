package main

import (
	"renaldis/backend-api/config"
	"renaldis/backend-api/database"
	"renaldis/backend-api/routes"
)

func main() {
	// Load GetEnv
	config.LoadEnv()

	// panggil db
	database.InitDB()

	//setup router
	r := routes.SetupRoutes()

	// mulai server dengan port 3000
	r.Run(":" + config.GetEnv("APP_PORT", "3000"))
}
