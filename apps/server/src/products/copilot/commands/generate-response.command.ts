import { GenerationConfig, GoogleGenerativeAI } from "@google/generative-ai"
import { envConfig } from "src/env.config"

export async function generateResponse(prompt: string, temperature: number, topP: number, topK: number) {
  try {
    const genAI = new GoogleGenerativeAI(envConfig.geminiAPIKey)
    const generationConfig: GenerationConfig = {
      temperature: temperature ?? 0.9,
      topP: topP ?? 0.1,
      topK: topK ?? 16,
    }
    const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig })
    const result = await model.generateContent(prompt)
    const response = result.response
    const textResponse = response.text()
    return { response: textResponse }
  }

  catch (error) {
    throw error
  }
}