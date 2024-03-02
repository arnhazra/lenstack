import { Module } from "@nestjs/common"
import { CopilotService } from "./copilot.service"
import { CopilotController } from "./copilot.controller"

@Module({
  controllers: [CopilotController],
  providers: [CopilotService],
})
export class CopilotModule { }
