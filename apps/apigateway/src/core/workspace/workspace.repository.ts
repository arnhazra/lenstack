import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Workspace } from "./schemas/workspace.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { FilterQuery, Model, Types } from "mongoose"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "src/shared/utils/events.union"
import { randomUUID } from "crypto"

@Injectable()
export class WorkspaceRepository {
  constructor(
    @InjectModel(Workspace.name, DbConnectionMap.Core)
    private model: Model<Workspace>
  ) {}

  @OnEvent(EventsUnion.CreateWorkspace)
  async createOne({
    name,
    userId,
  }: {
    name: string
    userId: string
  }): Promise<Workspace | null> {
    return await new this.model({
      name,
      userId: new Types.ObjectId(userId),
      accessKey: randomUUID(),
    }).save()
  }

  @OnEvent(EventsUnion.GetWorkspaceDetails)
  async findOne<K extends keyof Workspace>(
    filter: Pick<Workspace, K>
  ): Promise<Workspace | null> {
    return await this.model.findOne(filter as FilterQuery<Workspace>)
  }

  async findAll<K extends keyof Workspace>(
    filter: Pick<Workspace, K>
  ): Promise<Workspace[] | null> {
    return await this.model.find(filter as FilterQuery<Workspace>)
  }

  async deleteById(workspaceId: Types.ObjectId): Promise<Workspace | null> {
    return await this.model.findByIdAndDelete(workspaceId)
  }

  async updateById(
    userId: string,
    workspaceId: string
  ): Promise<Workspace | null> {
    const workspace = await this.model.findOne({
      _id: new Types.ObjectId(workspaceId),
      userId: new Types.ObjectId(userId),
    })
    workspace.accessKey = randomUUID()
    return await workspace.save()
  }
}
