import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Request,
} from "@nestjs/common"
import { IntelligenceService } from "./intelligence.service"
import { AIGenerationDto } from "./dto/ai-generate.dto"
import { CredentialGuard } from "src/shared/auth/credential.guard"
import { ModRequest } from "src/shared/auth/types/mod-request.interface"

@Controller("products/intelligence")
export class IntelligenceController {
  constructor(private readonly intelligenceService: IntelligenceService) {}

  @UseGuards(CredentialGuard)
  @Post("generate")
  async generateRecommendation(
    @Request() request: ModRequest,
    @Body() aiGenerationDto: AIGenerationDto
  ) {
    try {
      return await this.intelligenceService.generateRecommendation(
        request.user.workspaceId,
        aiGenerationDto.prompt,
        aiGenerationDto.temperature,
        aiGenerationDto.topP,
        aiGenerationDto.topK
      )
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
