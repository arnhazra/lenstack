import { QueryModel } from "../models/query.model"

export async function saveResponse(orgId: string, prompt: string, response: string) {
  const query = new QueryModel({ orgId, prompt, response })
  await query.save()
}