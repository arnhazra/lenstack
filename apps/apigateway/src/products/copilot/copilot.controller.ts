import { Controller, Post, Body, BadRequestException, UseGuards, Request } from "@nestjs/common"
import { CopilotService } from "./copilot.service"
import { AIGenerationDto } from "./dto/ai-generate.dto"
import { CredentialGuard } from "src/auth/credential.guard"
import { ModRequest } from "src/auth/types/mod-request.interface"

@Controller("products/copilot")
export class CopilotController {
  constructor(private readonly copilotService: CopilotService) { }

  @UseGuards(CredentialGuard)
  @Post("generate")
  async generateRecommendation(@Request() request: ModRequest, @Body() aiGenerationDto: AIGenerationDto) {
    try {
      return await this.copilotService.generateRecommendation(request.user.orgId, aiGenerationDto.prompt, aiGenerationDto.temperature, aiGenerationDto.topP, aiGenerationDto.topK)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
