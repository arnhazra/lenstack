import { randomUUID } from "crypto"
import { OrganizationModel } from "../models/organization.model"

export async function createOrganizationCommand(name: string, userId: string) {
  const clientId = randomUUID()
  const clientSecret = randomUUID()
  const organization = new OrganizationModel({ name, userId, clientId, clientSecret })
  await organization.save()
  return organization
}