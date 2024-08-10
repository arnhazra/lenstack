import { Module } from "@nestjs/common"
import { AccesstokenService } from "./accesstoken.service"
import { AccesstokenController } from "./accesstoken.controller"
import Redis from "ioredis"
import { envConfig } from "src/env.config"

@Module({
  controllers: [AccesstokenController],
  providers: [
    {
      provide: "REDIS_CLIENT",
      useFactory: () => {
        return new Redis({
          port: Number(envConfig.redisPort),
          host: envConfig.redisSocketHost,
          password: envConfig.redisPassword,
        })
      },
    },
    AccesstokenService,
  ],
})
export class AccesstokenModule { }
