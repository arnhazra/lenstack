import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { User } from "./schemas/user.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { FilterQuery, Model, Types } from "mongoose"
import { BaseRepository } from "src/shared/database/database.repository"

@Injectable()
export class IdentityRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name, DbConnectionMap.Identity) private userModel: Model<User>) {
    super(userModel)
  }
}
