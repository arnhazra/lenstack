import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { envConfig } from "./env.config";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [envConfig.rabbitMqURI],
      queue: "email_queue",
      queueOptions: {
        durable: false
      },
    },
  })

  app.listen()
}

bootstrap();
