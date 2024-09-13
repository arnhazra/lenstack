import { Injectable, BadRequestException } from "@nestjs/common"
import { statusMessages } from "src/shared/utils/constants/status-messages"
import { QueryBus } from "@nestjs/cqrs"
import { GetProductsQuery } from "./queries/impl/get-products.query"
import { Product } from "./schemas/products.schema"
import { GenerationConfig, GoogleGenerativeAI, SchemaType, } from "@google/generative-ai"
import { envConfig } from "src/env.config"
import { productSearchPrompt } from "src/shared/utils/prompts.config"

@Injectable()
export class ProductsService {
  constructor(private readonly queryBus: QueryBus) { }

  async getProductConfig(searchQuery: string, category: string) {
    try {
      const selectedFilterCategory = category === "All" || "" ? "" : category

      if (!searchQuery) {
        return await this.queryBus.execute<GetProductsQuery, Product[]>(new GetProductsQuery(searchQuery, selectedFilterCategory))
      }

      else {
        const data = await this.queryBus.execute<GetProductsQuery, Product[]>(new GetProductsQuery("", ""))

        try {
          const genAI = new GoogleGenerativeAI(envConfig.geminiAPIKey)
          const generationConfig: GenerationConfig = {
            temperature: 1,
            topP: 0.9,
            topK: 64,
            responseMimeType: "application/json",
          }

          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig })
          const prompt = `${productSearchPrompt}. Products list - ${data}. User has given a search keyword ${searchQuery}.`
          const result = await model.generateContent(prompt)
          const response: string[] = JSON.parse(result.response.text())
          const filteredProducts = data.filter(product => response.includes(String(product._id)))
          return filteredProducts
        }

        catch (error) {
          throw error
        }
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
