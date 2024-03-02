import { Module } from "@nestjs/common"
import { DataexchangeService } from "./dataexchange.service"
import { DataexchangeController } from "./dataexchange.controller"

@Module({
  controllers: [DataexchangeController],
  providers: [DataexchangeService],
})
export class DataexchangeModule { }
