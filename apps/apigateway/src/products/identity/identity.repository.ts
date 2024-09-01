import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { User } from "./schemas/user.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { FilterQuery, Model, Types } from "mongoose"

@Injectable()
export class IdentityRepository {
  constructor(@InjectModel(User.name, DbConnectionMap.Identity) private model: Model<User>) { }

  async createOne(email: string, orgId: string): Promise<User> {
    return await new this.model({ email, orgId: new Types.ObjectId(orgId) }).save()
  }

  async findOne<K extends keyof User>(filter: Pick<User, K>): Promise<User | null> {
    return await this.model.findOne(filter as FilterQuery<User>)
  }

  async find<K extends keyof User>(filter: Pick<User, K>): Promise<User[] | null> {
    return await this.model.find(filter as FilterQuery<User>)
  }
}
