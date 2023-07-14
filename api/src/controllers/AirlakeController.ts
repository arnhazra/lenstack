import { Request, Response } from 'express'
import arraySort from 'array-sort'
import { statusMessages } from '../constants/statusMessages'
import AirlakeDatasetModel from '../models/AirlakeDatasetModel'

export default class DatasetController {
    async getDatasetFilters(req: Request, res: Response) {
        try {
            const filterCategories = await AirlakeDatasetModel.find().distinct('category')
            filterCategories.push('All')
            filterCategories.sort()
            return res.status(200).json({ filterCategories })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async findDatasets(req: Request, res: Response) {
        const selectedFilterCategory = req.body.selectedFilter === 'All' ? '' : req.body.selectedFilter
        const selectedSortOption = req.body.selectedSortOption === '-name' ? { reverse: true } : { reverse: false }
        const searchQuery = req.body.searchQuery || ''
        const offset = req.body.offset || 0
        const limit = 36

        try {
            let datasets = await AirlakeDatasetModel.find({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } }
                ],
                category: { $regex: selectedFilterCategory }
            }).select('-data -description')
                .skip(offset)
                .limit(limit)

            datasets = arraySort(datasets, 'name', selectedSortOption)
            return res.status(200).json({ datasets })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async viewDataset(req: Request, res: Response) {
        try {
            const { datasetId } = req.body
            const totalData = await AirlakeDatasetModel.findById(datasetId).select('-data')
            return res.status(200).json(totalData)
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }

    async findSimilarDatasets(req: Request, res: Response) {
        try {
            const { datasetId } = req.body
            const { category } = await AirlakeDatasetModel.findById(datasetId).select('-data')
            const similarDatasets = await AirlakeDatasetModel.find({ category: category }).select('-data')
            return res.status(200).json({ similarDatasets })
        }

        catch (error) {
            return res.status(404).json({ msg: statusMessages.connectionError })
        }
    }

    async getMetadata(req: Request, res: Response) {
        try {
            const data = await AirlakeDatasetModel.findById(req.params.datasetId).select('data')
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
            const data = await AirlakeDatasetModel.findById(datasetId).select('data')
            return res.status(200).json({ data })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}