import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindOrgByIdQuery } from "../impl/find-org-by-id.query";
import { OrganizationRepository } from "../../organization.repository";
import { Types } from "mongoose";

@QueryHandler(FindOrgByIdQuery)
export class FindOrgByIdQueryHandler
  implements IQueryHandler<FindOrgByIdQuery>
{
  constructor(private readonly repository: OrganizationRepository) {}

  async execute(query: FindOrgByIdQuery) {
    const { orgId } = query;
    return await this.repository.findOne({ _id: new Types.ObjectId(orgId) });
  }
}
