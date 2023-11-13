import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateApiReferenceDto } from "./dto/create-apireference.dto"
import { ApiReferenceRepository } from "./apireference.repository"

@Injectable()
export class ApiReferenceService {
  constructor(private readonly apireferenceRepository: ApiReferenceRepository) { }
  async createApiReference(createApiReferenceDto: CreateApiReferenceDto) {
    try {
      const { productName, apiName, apiUri, apiMethod, sampleRequestBody, sampleResponseBody } = createApiReferenceDto
      await this.apireferenceRepository.create(productName, apiName, apiUri, apiMethod, sampleRequestBody, sampleResponseBody)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getApiReferenceByProductName(productName: string) {
    try {
      const docList = await this.apireferenceRepository.findAllByProductName(productName)
      return docList
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
