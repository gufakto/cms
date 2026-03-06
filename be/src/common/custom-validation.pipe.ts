import { ValidationPipe, BadRequestException, ValidationError, HttpStatus } from '@nestjs/common';

function getErrorText(statusCode: number): string {
  switch (statusCode) {
    case HttpStatus.BAD_REQUEST: return 'BAD_REQUEST';
    case HttpStatus.UNAUTHORIZED: return 'UNAUTHORIZED';
    case HttpStatus.FORBIDDEN: return 'FORBIDDEN';
    case HttpStatus.NOT_FOUND: return 'NOT_FOUND';
    case HttpStatus.INTERNAL_SERVER_ERROR: return 'INTERNAL_SERVER_ERROR';
    default: return 'ERROR';
  }
}

export class CustomValidationPipe extends ValidationPipe {
  constructor(private readonly statusCode = 400) { // default 400
    super({
      whitelist: true,  // buang properti yang tidak ada di DTO
      forbidNonWhitelisted: false, // throw error jika ada properti tambahan
      transform: true, // otomatis convert payload ke DTO class
      forbidUnknownValues: true, // mencegah nilai undefined / unknown
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors
          .map(err => Object.values(err.constraints || {}))
          .flat();
        
        return new BadRequestException({
          status: statusCode,
          message: messages.join(', '),
          error: getErrorText(statusCode),
        });
      },
    });
  }
}
