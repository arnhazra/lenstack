import { Injectable, BadRequestException } from "@nestjs/common"
import { statusMessages } from "src/utils/constants/status-messages"
import { getSolutionsQuery } from "./queries/get-solutions.query"

@Injectable()
export class SolutionService {
  async getSolutionConfig() {
    try {
      const solutions = await getSolutionsQuery()
      return solutions
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
