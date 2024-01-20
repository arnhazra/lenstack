import { BadRequestException, Injectable } from "@nestjs/common"
import { AIGenerationDto } from "./dto/ai-generate.dto"
import { generateResponse } from "./commands/generate-response.command"

@Injectable()
export class CopilotService {
  async generateRecommendation(aiGenerationDto: AIGenerationDto) {
    try {
      return await generateResponse(aiGenerationDto.prompt)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
