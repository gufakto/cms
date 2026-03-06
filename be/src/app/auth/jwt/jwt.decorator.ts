import { JwtAuthGuard } from '@/app/auth/jwt/jwt.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';

export function Auth() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
