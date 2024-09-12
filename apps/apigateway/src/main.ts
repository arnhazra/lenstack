import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { INestApplication, ValidationPipe } from "@nestjs/common"
import { envConfig } from "./env.config"
import { Request, Response } from "express"
import { otherConstants } from "./shared/utils/constants/other-constants"

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule)
  app.use("/", (req: Request, res: Response) => res.redirect(otherConstants.tokenIssuer))
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({ exposedHeaders: ["token"] })
  await app.listen(envConfig.apiPort)
}

bootstrap()
