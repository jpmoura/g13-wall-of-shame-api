import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AppModule from './app.module';

async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.disable('x-powered-by');

  return app;
}

function addSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('G13 Wall of Shame API')
    .setDescription('This API is used by G13 Wall of Shame')
    .setVersion('1.0')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setContact(
      'João Pedro Santos de Moura',
      'https://github.com/jpmoura',
      'moura.joaopedro@gmail.com',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}

function addGlobalPipes(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
}

async function bootstrap() {
  const app: INestApplication = await createApp();
  addSwagger(app);
  addGlobalPipes(app);

  await app.listen(process.env.PORT);
}

bootstrap();
