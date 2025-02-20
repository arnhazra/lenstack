import { Injectable } from "@nestjs/common"
import { GenerationConfig, GoogleGenerativeAI } from "@google/generative-ai"
import { envConfig } from "src/config"
import { CommandBus } from "@nestjs/cqrs"
import { CreateQueryCommand } from "./commands/impl/create-query.command"
import { Query } from "./schemas/query.schema"

@Injectable()
export class IntelligenceService {
  constructor(private readonly commandBus: CommandBus) {}

  async generateRecommendation(
    workspaceId: string,
    prompt: string,
    temperature: number,
    topP: number,
    topK: number
  ) {
    try {
      const genAI = new GoogleGenerativeAI(envConfig.geminiAPIKey)
      const generationConfig: GenerationConfig = {
        temperature: temperature ?? 0.9,
        topP: topP ?? 0.1,
        topK: topK ?? 16,
      }

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig,
      })
      const result = await model.generateContent(prompt)
      const response = result.response.text()
      await this.commandBus.execute<CreateQueryCommand, Query>(
        new CreateQueryCommand(workspaceId, prompt, response)
      )
      return { response }
    } catch (error) {
      throw error
    }
  }
}
