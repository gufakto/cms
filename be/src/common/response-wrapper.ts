import { HttpStatus } from "@nestjs/common";


export interface ResponseWrapper<T> {
    status: HttpStatus;
    message?: string;
    data: T
}