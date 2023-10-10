import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { dbConnect } from "./utils/dbConnect"
import { ValidationPipe } from "@nestjs/common"
import { envConfig } from "./config/envConfig"

export const config = {
  runtime: 'edge',
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  dbConnect()
  await app.listen(envConfig.apiPort)
}

bootstrap()
