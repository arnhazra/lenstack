import { MetaDataModel } from "../models/metadata.model"

export async function findDatasetMetadataById(datasetId: string) {
  const metaData = await MetaDataModel.findById(datasetId)
  return metaData
}