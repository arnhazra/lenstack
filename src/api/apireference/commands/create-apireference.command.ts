import { ApiReferenceModel } from "../models/apireference.model"

export async function createAPIReferenceCommand(productName: string, apiName: string, apiUri: string, apiMethod: string, sampleRequestBody: any, sampleResponseBody: any) {
  const newDoc = new ApiReferenceModel({ productName, apiName, apiUri, apiMethod, sampleRequestBody, sampleResponseBody })
  await newDoc.save()
  return true
}