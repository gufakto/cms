import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express';

@Controller("/")
export class HomeController {
    @Get()
    hello(@Res() res: Response) {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: "Selamat datang di api"
        });
    }
}