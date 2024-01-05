import { ApiReferenceModel } from "../models/apireference.model"

export async function findAPIReferencesByProductNameQuery(productName: string) {
  const docList = await ApiReferenceModel.find({ productName })
  return docList
}