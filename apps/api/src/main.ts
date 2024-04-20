import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { connectDatabases } from "./lib/connect-databases"
import { INestApplication, ValidationPipe } from "@nestjs/common"
import { envConfig } from "./env.config"

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule)
  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  connectDatabases()
  await app.listen(envConfig.apiPort)
}

bootstrap()
