import { DatasetModel } from "../models/dataset.model"
import { MetaDataModel } from "../models/metadata.model"

export async function findDatasetMetadataById(datasetId: string) {
  const metaData = await MetaDataModel.findById(datasetId)
  const dataLength = (await DatasetModel.findOne({ datasetRelationId: datasetId })).data.length
  return { metaData, dataLength }
}