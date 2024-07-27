import { OrganizationModel } from "../models/organization.model"

export async function findMyOrganizationsQuery(userId: string) {
  const myOrganizations = await OrganizationModel.find({ userId })
  return myOrganizations
}