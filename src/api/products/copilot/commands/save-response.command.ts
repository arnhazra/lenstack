import { QueryModel } from "../models/query.model"

export async function saveResponse(workspaceId: string, prompt: string, response: string) {
  const query = new QueryModel({ workspaceId, prompt, response })
  await query.save()
}