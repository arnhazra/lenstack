import { QueryModel } from "../schemas/query.schema"

export async function saveResponse(orgId: string, prompt: string, response: string) {
  const query = new QueryModel({ orgId, prompt, response })
  await query.save()
}