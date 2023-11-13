import { BadRequestException, Injectable } from "@nestjs/common"
import { DocumentationModel } from "./entities/documentation.entity"

@Injectable()
export class DocumentationRepository {
  async create(productName: string, apiName: string, apiUri: string, apiMethod: string, sampleRequestBody: any, sampleResponseBody: any) {
    try {
      const newDoc = new DocumentationModel({ productName, apiName, apiUri, apiMethod, sampleRequestBody, sampleResponseBody })
      await newDoc.save()
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async findAllByProductName(productName: string) {
    try {
      const docList = await DocumentationModel.find({ productName })
      return docList
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
