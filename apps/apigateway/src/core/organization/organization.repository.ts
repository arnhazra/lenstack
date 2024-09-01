import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Organization } from "./schemas/organization.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { FilterQuery, Model, Types } from "mongoose"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "src/shared/utils/events.union"
import { randomUUID } from "crypto"

@Injectable()
export class OrganizationRepository {
  constructor(@InjectModel(Organization.name, DbConnectionMap.Core) private model: Model<Organization>) { }

  @OnEvent(EventsUnion.CreateOrg)
  async createOne({ name, userId }: { name: string, userId: string }): Promise<Organization | null> {
    return await new this.model({ name, userId: new Types.ObjectId(userId), clientId: randomUUID(), clientSecret: randomUUID() }).save()
  }

  @OnEvent(EventsUnion.GetOrgDetails)
  async findOne<K extends keyof Organization>(filter: Pick<Organization, K>): Promise<Organization | null> {
    return await this.model.findOne(filter as FilterQuery<Organization>)
  }

  async findAll<K extends keyof Organization>(filter: Pick<Organization, K>): Promise<Organization[] | null> {
    return await this.model.find(filter as FilterQuery<Organization>)
  }

  async deleteById(orgId: string): Promise<Organization | null> {
    return await this.model.findByIdAndDelete(orgId)
  }

  async updateById(userId: string, orgId: string): Promise<Organization | null> {
    const org = await this.model.findOne({ _id: new Types.ObjectId(orgId), userId: new Types.ObjectId(userId) })
    org.clientId = randomUUID()
    org.clientSecret = randomUUID()
    return await org.save()
  }
}
