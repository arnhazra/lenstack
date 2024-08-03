import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { CopilotService } from "./copilot.service"
import { AIGenerationDto } from "./dto/ai-generate.dto"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/auth/credential-authorizer.decorator"

@Controller("products/copilot")
export class CopilotController {
  constructor(private readonly copilotService: CopilotService) { }

  @Post("generate")
  async generateRecommendation(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() aiGenerationDto: AIGenerationDto) {
    try {
      return await this.copilotService.generateRecommendation(user.orgId, aiGenerationDto.prompt, aiGenerationDto.temperature, aiGenerationDto.topP, aiGenerationDto.topK)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
