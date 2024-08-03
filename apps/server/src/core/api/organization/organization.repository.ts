import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Organization } from "./schemas/organization.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { FilterQuery, Model } from "mongoose"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "src/core/events/events.union"

@Injectable()
export class OrganizationRepository {
  constructor(@InjectModel(Organization.name, DbConnectionMap.Core) private model: Model<Organization>) { }

  async createOne(name: string, userId: string): Promise<Organization | null> {
    return await new this.model({ name, userId }).save()
  }

  @OnEvent(EventsUnion.GetOrgDetails)
  async findOne<K extends keyof Organization>(filter: Pick<Organization, K>): Promise<Organization | null> {
    return await this.model.findOne(filter as FilterQuery<Organization>)
  }

  async findAll<K extends keyof Organization>(filter: Pick<Organization, K>): Promise<Organization[] | null> {
    return await this.model.find(filter as FilterQuery<Organization>)
  }

  async deleteById(orgId: string) {
    return await this.model.findByIdAndDelete(orgId)
  }
}
