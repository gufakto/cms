export interface UserCreate{
    name: string
    email: string
    phone: string
    password: string
}

export interface UserOut{
    id: number| null
    name: string
    email: string
    phone: string
    created_at: Date
    updated_at: Date
}

export interface UserPaginate {
    page: number
    pageSize: number
    total: number
    data: UserOut[]
}

export interface UpdateUserParams {
    name: string
    email: string
    phone: string
}