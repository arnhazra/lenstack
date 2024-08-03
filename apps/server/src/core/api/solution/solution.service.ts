import { Injectable, BadRequestException } from "@nestjs/common"
import { QueryBus } from "@nestjs/cqrs"
import { statusMessages } from "src/utils/constants/status-messages"
import { GetSolutionsQuery } from "./queries/impl/get-solutions.query"

@Injectable()
export class SolutionService {
  constructor(private readonly qureryBus: QueryBus) { }

  async getSolutionConfig() {
    try {
      return await this.qureryBus.execute(new GetSolutionsQuery())
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
