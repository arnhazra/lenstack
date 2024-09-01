import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { User } from "./schemas/user.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { FilterQuery, Model } from "mongoose"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "src/utils/events.union"
import { BaseRepository } from "src/infra/database.repository"

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name, DbConnectionMap.Core) private userModel: Model<User>) {
    super(userModel)
  }

  @OnEvent(EventsUnion.GetUserDetails)
  async find<K extends keyof User>(filter: Pick<User, K>): Promise<User | null> {
    return await super.findOne(filter as FilterQuery<User>)
  }

  @OnEvent(EventsUnion.UpdateUserDetails)
  async updateOneById<K extends keyof User>(userId: string, key: K, value: User[K]): Promise<User | null> {
    return await super.update({ _id: userId }, { [key]: value })
  }
}
