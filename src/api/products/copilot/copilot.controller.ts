import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { CopilotService } from "./copilot.service"
import { AIGenerationDto } from "./dto/ai-generate.dto"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"

@Controller("products/copilot")
export class CopilotController {
  constructor(private readonly copilotService: CopilotService) { }

  @Post("generate")
  async generateRecommendation(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse, @Body() aiGenerationDto: AIGenerationDto) {
    try {
      return await this.copilotService.generateRecommendation(aiGenerationDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
