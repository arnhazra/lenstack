import { BadRequestException, Injectable } from "@nestjs/common"
import { ApiReferenceModel } from "./entities/apireference.entity"

@Injectable()
export class ApiReferenceRepository {
  async create(productName: string, apiName: string, apiUri: string, apiMethod: string, sampleRequestBody: any, sampleResponseBody: any) {
    try {
      const newDoc = new ApiReferenceModel({ productName, apiName, apiUri, apiMethod, sampleRequestBody, sampleResponseBody })
      await newDoc.save()
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async findAllByProductName(productName: string) {
    try {
      const docList = await ApiReferenceModel.find({ productName })
      return docList
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
