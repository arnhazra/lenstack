import { DatasetModel } from "../models/dataset.model"

export async function findDatasetDataById(datasetId: string) {
  const dataset = await DatasetModel.findOne({ datasetRelationId: datasetId })
  return dataset
}