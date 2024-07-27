import { DatasetModel } from "../schemas/dataset.schema"

export async function findDatasetDataById(datasetId: string) {
  const dataset = await DatasetModel.findOne({ datasetRelationId: datasetId })
  return dataset
}