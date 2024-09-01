import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { User } from "./schemas/user.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { FilterQuery, Model } from "mongoose"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "src/utils/events.union"

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name, DbConnectionMap.Core) private model: Model<User>) { }

  async createOne(email: string, name: string, walletBalance: number): Promise<User> {
    return await new this.model({ email, name, walletBalance }).save()
  }

  @OnEvent(EventsUnion.GetUserDetails)
  async findOne<K extends keyof User>(filter: Pick<User, K>): Promise<User | null> {
    return await this.model.findOne(filter as FilterQuery<User>)
  }

  @OnEvent(EventsUnion.UpdateUserDetails)
  async updateOneById<K extends keyof User>(userId: string, key: K, value: User[K]): Promise<User | null> {
    return await this.model.findByIdAndUpdate(userId, { [key]: value })
  }
}
