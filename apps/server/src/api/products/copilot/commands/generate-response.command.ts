import { GoogleGenerativeAI } from "@google/generative-ai"
import { envConfig } from "src/env.config"

export async function generateResponse(prompt: string) {
  try {
    const genAI = new GoogleGenerativeAI(envConfig.geminiAPIKey)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    const response = result.response
    const textResponse = response.text()
    return { response: textResponse }
  }

  catch (error) {
    throw error
  }
}