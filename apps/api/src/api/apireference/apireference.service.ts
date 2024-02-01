import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateApiReferenceDto } from "./dto/create-apireference.dto"
import { createAPIReferenceCommand } from "./commands/create-apireference.command"
import { findAPIReferencesByProductNameQuery } from "./queries/find-apireferences"

@Injectable()
export class ApiReferenceService {
  async createApiReference(createApiReferenceDto: CreateApiReferenceDto) {
    try {
      const { productName, apiName, apiUri, apiMethod, sampleRequestBody, sampleResponseBody } = createApiReferenceDto
      await createAPIReferenceCommand(productName, apiName, apiUri, apiMethod, sampleRequestBody, sampleResponseBody)
      return { success: true }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getApiReferenceByProductName(productName: string) {
    try {
      const docList = await findAPIReferencesByProductNameQuery(productName)
      return docList
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
