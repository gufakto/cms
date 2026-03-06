import '@/polyfill';  
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomValidationPipe } from '@/common/custom-validation.pipe';
import { useContainer } from 'class-validator';
import { RouteService } from '@/app/route/route.service';
import { HttpExceptionFilter } from '@/common/custom-filter.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const scanner = app.get(RouteService);
  const _ = scanner.scanRoutes()
  // console.log(routes);

  // Enable DI untuk validator custom
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new CustomValidationPipe(400));


  // 1️⃣ Set global prefix untuk semua endpoint
  app.setGlobalPrefix('v1/api');

  // swagger config
  const config = new DocumentBuilder()
    .setTitle("CMS API")
    .setDescription("CMS Api adalah backend untuk CMS admin")
    .setVersion("1.0")
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization'
    }, 'access-token')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
