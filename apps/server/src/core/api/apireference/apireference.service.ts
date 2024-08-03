import { BadRequestException, Injectable } from "@nestjs/common"
import { QueryBus } from "@nestjs/cqrs"
import { FindAPIReferencesQuery } from "./queries/impl/find-apireferences.query"

@Injectable()
export class ApiReferenceService {
  constructor(private readonly queryBus: QueryBus) { }

  async getApiReferenceByProductName(productName: string) {
    try {
      return await this.queryBus.execute(new FindAPIReferencesQuery(productName))
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
