import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { INestApplication, ValidationPipe } from "@nestjs/common"
import { envConfig } from "./env.config"
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { QueueUnion } from "./microservices/events.union"
import { EmailModule } from "./microservices/email/email.module"

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule)
  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({ exposedHeaders: ["token"] })

  const emailMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(EmailModule, {
    transport: Transport.RMQ,
    options: {
      urls: [envConfig.rabbitMqURI],
      queue: QueueUnion.EmailQueue,
      queueOptions: {
        durable: false
      },
    },
  })

  await app.listen(envConfig.apiPort)
  await emailMicroservice.listen()
}

bootstrap()