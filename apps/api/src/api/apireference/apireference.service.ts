import { BadRequestException, Injectable } from "@nestjs/common"
import { findAPIReferencesByProductNameQuery } from "./queries/find-apireferences.query"

@Injectable()
export class ApiReferenceService {
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
