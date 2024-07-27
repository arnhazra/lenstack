import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { CopilotService } from "./copilot.service"
import { AIGenerationDto } from "./dto/ai-generate.dto"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/auth/credential-authorizer.decorator"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/core/events/events.union"

@Controller("products/copilot")
export class CopilotController {
  constructor(private readonly copilotService: CopilotService, private readonly eventEmitter: EventEmitter2) { }

  @Post("generate")
  async generateRecommendation(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() aiGenerationDto: AIGenerationDto) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "products/copilot", method: "POST", api: "/generate" })
      return await this.copilotService.generateRecommendation(user.orgId, aiGenerationDto.prompt, aiGenerationDto.temperature, aiGenerationDto.topP, aiGenerationDto.topK)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
