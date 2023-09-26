import { Request, Response } from "express"
import { statusMessages } from "../../../constants/statusMessages"
import { MasterAirlakeHistoryModel, ReplicaAirlakeHistoryModel } from "./AirlakeHistoryModel"
import { MasterAirlakeDatasetMetaDataModel, ReplicaAirlakeDatasetMetaDataModel } from "./AirlakeDatasetMetadataModel"
import { MasterAirlakeDatasetDataModel, ReplicaAirlakeDatasetDataModel } from "./AirlakeDatasetDataModel"

export default class DatasetController {
    async getDatasetFilters(req: Request, res: Response) {
        try {
            const filterCategories = await MasterAirlakeDatasetMetaDataModel.find().distinct("category")
            filterCategories.push("All")
            filterCategories.sort()
            return res.status(200).json({ filterCategories })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async findDatasets(req: Request, res: Response) {
        const selectedFilterCategory = req.body.selectedFilter === "All" ? "" : req.body.selectedFilter
        const selectedSortOption = req.body.selectedSortOption || "name"
        const searchQuery = req.body.searchQuery || ""
        const offset = req.body.offset || 0
        const limit = 36

        try {
            let datasets = await MasterAirlakeDatasetMetaDataModel.find({
                $or: [
                    { name: { $regex: searchQuery, $options: "i" } },
                    { description: { $regex: searchQuery, $options: "i" } }
                ],
                category: { $regex: selectedFilterCategory }
            }).select("-description")
                .sort(selectedSortOption)
                .skip(offset)
                .limit(limit)

            return res.status(200).json({ datasets })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async viewDataset(req: Request, res: Response) {
        try {
            const { datasetId } = req.body
            const totalData = await MasterAirlakeDatasetMetaDataModel.findById(datasetId).select("-data")
            return res.status(200).json(totalData)
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }

    async findSimilarDatasets(req: Request, res: Response) {
        try {
            const { datasetId } = req.body
            const { category } = await MasterAirlakeDatasetMetaDataModel.findById(datasetId).select("-data")
            const similarDatasets = await MasterAirlakeDatasetMetaDataModel.find({ category: category }).select("-data")
            return res.status(200).json({ similarDatasets })
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }

    async getPreviewData(req: Request, res: Response) {
        try {
            const data = await MasterAirlakeDatasetDataModel.findOne({ datasetRelationId: req.params.datasetId }).select("data")
            const previewdata = data.data.slice(-10)
            return res.status(200).json({ previewdata })
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }

    async getData(req: Request, res: Response) {
        try {
            const { datasetId, apiKey } = req.params
            const data = await MasterAirlakeDatasetDataModel.findOne({ datasetRelationId: req.params.datasetId }).select("data")
            const airlakeHistoryReq = new MasterAirlakeHistoryModel({ owner: req.headers.id as string, datasetId, apiKey })
            await airlakeHistoryReq.save()
            const replicaAirlakeHistoryReq = new ReplicaAirlakeHistoryModel({ _id: airlakeHistoryReq.id, owner: req.headers.id as string, datasetId, apiKey })
            await replicaAirlakeHistoryReq.save()
            return res.status(200).json({ data })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}