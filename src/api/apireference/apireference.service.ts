import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateApiReferenceDto } from "./dto/create-apireference.dto"
import createAPIReference from "./commands/create-apireference.command"
import findAPIReferencesByProductName from "./queries/find-apireferences"

@Injectable()
export class ApiReferenceService {
  async createApiReference(createApiReferenceDto: CreateApiReferenceDto) {
    try {
      const { productName, apiName, apiUri, apiMethod, sampleRequestBody, sampleResponseBody } = createApiReferenceDto
      await createAPIReference(productName, apiName, apiUri, apiMethod, sampleRequestBody, sampleResponseBody)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getApiReferenceByProductName(productName: string) {
    try {
      const docList = await findAPIReferencesByProductName(productName)
      return docList
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
