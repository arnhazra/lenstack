import { ApiReferenceModel } from "../schemas/apireference.schema"

export async function findAPIReferencesByProductNameQuery(productName: string) {
  const docList = await ApiReferenceModel.find({ productName }).sort("productName")
  return docList
}