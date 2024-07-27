import { DatasetModel } from "../schemas/dataset.schema"
import { MetaDataModel } from "../schemas/metadata.schema"

export async function findDatasetMetadataById(datasetId: string) {
  const metaData = await MetaDataModel.findById(datasetId)
  const dataLength = (await DatasetModel.findOne({ datasetRelationId: datasetId })).data.length
  return { metaData, dataLength }
}