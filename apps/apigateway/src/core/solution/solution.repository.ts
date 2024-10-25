import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DbConnectionMap } from "src/shared/utils/db-connection.map";
import { Model } from "mongoose";
import { Solution } from "./schemas/solutions.schema";
import { BaseRepository } from "src/shared/database/database.repository";

@Injectable()
export class SolutionsRepository extends BaseRepository<Solution> {
  constructor(
    @InjectModel(Solution.name, DbConnectionMap.Core)
    private solutionModel: Model<Solution>
  ) {
    super(solutionModel);
  }
}
