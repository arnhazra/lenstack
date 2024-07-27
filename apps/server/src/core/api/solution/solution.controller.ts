import { Controller, Get, Query } from "@nestjs/common"
import { SolutionService } from "./solution.service"

@Controller("solutions")
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) { }

  @Get("getsolutionconfig")
  async getSolutionConfig() {
    try {
      const solutions = await this.solutionService.getSolutionConfig()
      return solutions
    }

    catch (error) {
      throw error
    }
  }
}
