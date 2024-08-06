import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { ApiReference } from "./schemas/apireference.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Model } from "mongoose"

@Injectable()
export class ApiReferenceRepository {
  constructor(@InjectModel(ApiReference.name, DbConnectionMap.Core) private model: Model<ApiReference>) { }

  async findOne(productName: string): Promise<ApiReference[] | null> {
    return await this.model.find({ productName }).sort("productName")
  }
}
