import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const resBody: any = exception.getResponse();

    response.status(status).json({
      message: typeof resBody === 'object' ? resBody['message'] : resBody,
      error: exception.name.replace('Exception', ''),
      status: status, // ubah dari statusCode ke status
    });
  }
}
