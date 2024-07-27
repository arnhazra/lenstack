import { OrganizationModel } from "../models/organization.model"

export async function findOrganizationByCredentialQuery(clientId: string, clientSecret: string) {
  const organization = await OrganizationModel.findOne({ clientId, clientSecret })
  return organization
}