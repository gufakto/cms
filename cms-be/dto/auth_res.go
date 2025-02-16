package dto

type AuthRes struct {
	Token        string   `json:"token"`
	User         UserData `json:"user"`
	RefreshToken string   `json:"refresh_token"`
}
