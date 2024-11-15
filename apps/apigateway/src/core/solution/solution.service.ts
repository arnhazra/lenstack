import { Injectable, BadRequestException } from "@nestjs/common"
import { QueryBus } from "@nestjs/cqrs"
import { statusMessages } from "src/shared/utils/constants/status-messages"
import { GetSolutionsQuery } from "./queries/impl/get-solutions.query"
import { Solution } from "./schemas/solutions.schema"

@Injectable()
export class SolutionService {
  constructor(private readonly qureryBus: QueryBus) {}

  async getSolutionConfig() {
    try {
      return await this.qureryBus.execute<GetSolutionsQuery, Solution[]>(
        new GetSolutionsQuery()
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
