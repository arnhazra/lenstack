import { Module } from "@nestjs/common"
import { TokenService } from "./token.service"
import { TokenController } from "./token.controller"
import Redis from "ioredis"
import { envConfig } from "src/config"

@Module({
  controllers: [TokenController],
  providers: [
    {
      provide: "REDIS_CLIENT",
      useFactory: () => {
        return new Redis(envConfig.redisURI)
      },
    },
    TokenService,
  ],
})
export class TokenModule {}
