import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { ApiReference } from "./schemas/apireference.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Model } from "mongoose"
import { BaseRepository } from "src/infra/database.repository"

@Injectable()
export class ApiReferenceRepository extends BaseRepository<ApiReference> {
  constructor(@InjectModel(ApiReference.name, DbConnectionMap.Core) private apiReferenceModel: Model<ApiReference>) {
    super(apiReferenceModel)
  }
}
