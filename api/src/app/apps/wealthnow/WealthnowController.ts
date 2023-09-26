import { Request, Response } from "express"
import { MasterWealthnowAssetModel, ReplicaWealthnowAssetModel } from "./WealthnowAssetModel"
import { MasterWealthnowPortfolioModel, ReplicaWealthnowPortfolioModel } from "./WealthnowPortfolioModel"

export default class WealthnowController {
    async createPortfolio(req: Request, res: Response) {
        const { name } = req.body
        const owner = req.headers.id

        try {
            const count = await MasterWealthnowPortfolioModel.find({ owner }).count()

            if (count < 100) {
                const portfolio = new MasterWealthnowPortfolioModel({ owner, name })
                const portfolioReplica = new ReplicaWealthnowPortfolioModel({ owner, name })
                await portfolio.save()
                await portfolioReplica.save()
                return res.status(200).json({ msg: "New Portfolio Created", portfolio })
            }

            else {
                return res.status(400).json({ msg: "Portfolio Limit Reached" })
            }
        }

        catch (error) {
            return res.status(500).json({ msg: "Error Creating Portfolio" })
        }
    }

    async getPortfolios(req, res) {
        try {
            const portfolios = await MasterWealthnowPortfolioModel.find({ owner: req.headers.id })
            let consolidatedAsset = 0

            for (const portfolio of portfolios) {
                const { owner, id: portfolioId } = portfolio
                const assets = await MasterWealthnowAssetModel.find({ portfolioId, owner }).sort({ createdAt: -1 })
                let totalAssetUnderPortfolio = 0

                assets.forEach(asset => totalAssetUnderPortfolio += asset.principalAmount)
                consolidatedAsset += totalAssetUnderPortfolio
            }

            return res.status(200).json({ portfolios, consolidatedAsset })
        } catch (error) {
            return res.status(500).json({ msg: "Connection Error" })
        }
    }

    async viewPortfolio(req: Request, res: Response) {
        try {
            const { portfolioId } = req.body
            const portfolio = await MasterWealthnowPortfolioModel.findById(portfolioId)
            const { owner } = portfolio
            const assets = await MasterWealthnowAssetModel.find({ portfolioId, owner }).sort({ createdAt: -1 })
            let totalAssetUnderPortfolio = 0
            assets.forEach(asset => totalAssetUnderPortfolio += asset.principalAmount)

            if (owner.toString() === req.headers.id) {
                return res.status(200).json({ portfolio, assets, totalAssetUnderPortfolio })
            }

            else {
                return res.status(404).json({ msg: "Portfolio Not Found" })
            }
        }

        catch (error) {
            return res.status(404).json({ msg: "Portfolio Not Found" })
        }
    }

    async deletePortfolio(req: Request, res: Response) {
        try {
            const portfolio = await MasterWealthnowPortfolioModel.findById(req.params.id)

            if (portfolio.owner.toString() === req.headers.id) {
                await MasterWealthnowAssetModel.deleteMany({ owner: req.headers.id, portfolioId: req.params.id })
                await ReplicaWealthnowAssetModel.deleteMany({ owner: req.headers.id, portfolioId: req.params.id })
                await MasterWealthnowPortfolioModel.findByIdAndDelete(portfolio.id)
                await ReplicaWealthnowPortfolioModel.findByIdAndDelete(portfolio.id)
                return res.status(200).json({ msg: "Project Deleted" })
            }

            else {
                return res.status(404).json({ msg: "Project Not Found" })
            }
        }

        catch (err) {
            return res.status(404).json({ msg: "Project Not Found" })
        }
    }

    async createAsset(req: Request, res: Response) {
        const { portfolioId, principalAmount, rateOfInterest, tenure, maturityAmount, apiKey } = req.body

        try {
            const userId = req.headers.id
            const portfolio = await MasterWealthnowPortfolioModel.findById(portfolioId)

            if (portfolio && portfolio.owner.toString() === userId) {
                const portfolioId = portfolio.id
                const asset = new MasterWealthnowAssetModel({ owner: userId, portfolioId, principalAmount, rateOfInterest, tenure, maturityAmount, apiKey })
                const assetReplica = new ReplicaWealthnowAssetModel({ owner: userId, portfolioId, principalAmount, rateOfInterest, tenure, maturityAmount, apiKey })
                await asset.save()
                await assetReplica.save()
                return res.status(200).json({ msg: "Asset created" })
            }

            else {
                return res.status(500).json({ msg: "Error creating asset" })
            }
        }

        catch (error) {
            return res.status(500).json({ msg: "Error creating asset" })
        }
    }

    async viewAsset(req: Request, res: Response) {
        try {
            const { assetId } = req.body
            const asset = await MasterWealthnowAssetModel.findById(assetId)

            if (asset.owner.toString() === req.headers.id) {
                return res.status(200).json({ asset })
            }

            else {
                return res.status(404).json({ msg: "Asset Not Found" })
            }
        }

        catch (error) {
            return res.status(404).json({ msg: "Asset Not Found" })
        }
    }

    async editAsset(req: Request, res: Response) {
        const { assetId, principalAmount, rateOfInterest, tenure, maturityAmount, createdAt } = req.body

        try {
            const userId = req.headers.id
            const asset = await MasterWealthnowAssetModel.findById(assetId)
            if (asset && asset.owner.toString() === userId) {
                await MasterWealthnowAssetModel.findByIdAndUpdate(assetId, { principalAmount, rateOfInterest, tenure, maturityAmount, createdAt })
                await ReplicaWealthnowAssetModel.findByIdAndUpdate(assetId, { principalAmount, rateOfInterest, tenure, maturityAmount, createdAt })
                return res.status(200).json({ msg: "Asset updated" })
            }

            else {
                return res.status(500).json({ msg: "Error updating asset" })
            }
        }

        catch (error) {
            return res.status(500).json({ msg: "Error updating asset" })
        }
    }

    async deleteAsset(req: Request, res: Response) {
        try {
            const userId = req.headers.id
            const asset = await MasterWealthnowAssetModel.findById(req.params.id)
            if (asset && asset.owner.toString() === userId) {
                await MasterWealthnowAssetModel.findByIdAndDelete(asset.id)
                await ReplicaWealthnowAssetModel.findByIdAndDelete(asset.id)
                return res.status(200).json({ msg: "Asset deleted" })
            }

            else {
                return res.status(500).json({ msg: "Error deleting asset" })
            }
        }

        catch (error) {
            return res.status(500).json({ msg: "Error updating asset" })
        }
    }
}