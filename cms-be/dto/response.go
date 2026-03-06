package dto

type Response struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}
type ResponsePaginate[T any] struct {
	Status int
	Data   T   `json:"data"`
	Page   int `json:"page"`
	Limit  int `json:"limit"`
	Total  int `json:"total"`
}

type ResponseData[T any] struct {
	Status int `json:"status"`
	Data   T   `json:"data"`
}
