import { Request, Response } from "express"
import { statusMessages } from "../../../constants/statusMessages"
import AirlakeHistoryModel from "./AirlakeHistoryModel"
import AirlakeDatasetMetaDataModel from "./AirlakeDatasetMetadataModel"
import AirlakeDatasetDataModel from "./AirlakeDatasetDataModel"

export default class DatasetController {
    async getDatasetFilters(req: Request, res: Response) {
        try {
            const filterCategories = await AirlakeDatasetMetaDataModel.find().distinct("category")
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
            let datasets = await AirlakeDatasetMetaDataModel.find({
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
            const totalData = await AirlakeDatasetMetaDataModel.findById(datasetId).select("-data")
            return res.status(200).json(totalData)
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }

    async findSimilarDatasets(req: Request, res: Response) {
        try {
            const { datasetId } = req.body
            const { category } = await AirlakeDatasetMetaDataModel.findById(datasetId).select("-data")
            const similarDatasets = await AirlakeDatasetMetaDataModel.find({ category: category }).select("-data")
            return res.status(200).json({ similarDatasets })
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }

    async getPreviewData(req: Request, res: Response) {
        try {
            const data = await AirlakeDatasetDataModel.findOne({ datasetRelationId: req.params.datasetId }).select("data")
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
            const data = await AirlakeDatasetDataModel.findOne({ datasetRelationId: req.params.datasetId }).select("data")
            const airlakeHistoryReq = new AirlakeHistoryModel({ owner: req.headers.id as string, datasetId, apiKey })
            await airlakeHistoryReq.save()
            return res.status(200).json({ data })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}