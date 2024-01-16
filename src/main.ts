import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { dbConnect } from "./utils/db-connect"
import { INestApplication, ValidationPipe } from "@nestjs/common"
import { envConfig } from "./env.config"

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AppModule)
  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  dbConnect()
  await app.listen(envConfig.apiPort)
}

bootstrap()
