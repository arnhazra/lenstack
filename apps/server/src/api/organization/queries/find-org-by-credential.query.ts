import { OrganizationModel } from "../schemas/organization.schema"

export async function findOrganizationByCredentialQuery(clientId: string, clientSecret: string) {
  const organization = await OrganizationModel.findOne({ clientId, clientSecret })
  return organization
}