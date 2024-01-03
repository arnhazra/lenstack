import { ApiReferenceModel } from "../models/apireference.model"

export default async function findAPIReferencesByProductName(productName: string) {
  const docList = await ApiReferenceModel.find({ productName })
  return docList
}