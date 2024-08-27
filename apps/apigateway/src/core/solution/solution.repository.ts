import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Model } from "mongoose"
import { Solution } from "./schemas/solutions.schema"

@Injectable()
export class SolutionsRepository {
  constructor(@InjectModel(Solution.name, DbConnectionMap.Core) private model: Model<Solution>) { }

  async findAll(): Promise<Solution[] | null> {
    return await this.model.find().sort("solutionName")
  }
}
