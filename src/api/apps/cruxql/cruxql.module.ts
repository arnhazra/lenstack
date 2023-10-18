import { Module } from "@nestjs/common"
import { CruxqlService } from "./cruxql.service"
import { CruxqlController } from "./cruxql.controller"
import { CruxqlRepository } from "./cruxql.repository"

@Module({
  controllers: [CruxqlController],
  providers: [CruxqlService, CruxqlRepository],
})
export class CruxqlModule { }
