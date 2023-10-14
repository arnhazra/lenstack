import { Module } from "@nestjs/common"
import { CruxqlService } from "./cruxql.service"
import { CruxqlController } from "./cruxql.controller"

@Module({
  controllers: [CruxqlController],
  providers: [CruxqlService],
})
export class CruxqlModule { }
