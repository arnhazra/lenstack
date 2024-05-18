import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { connectDatabases } from "./lib/connect-databases"
import { INestApplication, INestMicroservice, ValidationPipe } from "@nestjs/common"
import { envConfig } from "./env.config"
import { WorkspaceModule } from "./api/workspace/workspace.module"

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule)
  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  connectDatabases()
  await app.listen(envConfig.apiPort)
}

bootstrap()