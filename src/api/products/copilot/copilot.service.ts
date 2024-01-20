import { Injectable } from "@nestjs/common"
import { AIGenerationDto } from "./dto/ai-generate.dto"

@Injectable()
export class CopilotService {
  generateRecommendation(aiGenerationDto: AIGenerationDto) {
    return "This action adds a new copilot"
  }
}
