APP=./main.go
swagger:
	swag init -g $(APP)

run:
	go run $(APP)

watch:
	reflex -r '(\.go|\.yaml|\.yml)$$' -s -G 'docs/*' -- sh -c 'swag init -g $(APP) && go run $(APP)'

run-seed:
	go run seed/main.go