import { OrganizationModel } from "../models/organization.model"

export async function findOrganizationByIdQuery(orgId: string) {
  const organization = await OrganizationModel.findById(orgId)
  return organization
}