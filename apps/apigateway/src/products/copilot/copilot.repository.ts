import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Query } from "./schemas/query.schema"
import { Model, Types } from "mongoose"

@Injectable()
export class CopilotRepository {
  constructor(@InjectModel(Query.name, DbConnectionMap.Copilot) private model: Model<Query>) { }

  async createOne(orgId: string, prompt: string, response: string): Promise<Query> {
    const doc = new this.model({ orgId: new Types.ObjectId(orgId), prompt, response })
    await doc.save()
    return doc
  }
}
