import { Request, Response } from "express"
import crypto from "crypto"
import WealthnowAssetModel from "./WealthnowAssetModel"
import WealthnowPortfolioModel from "./WealthnowPortfolioModel"

export default class WealthnowController {
    async createPortfolio(req: Request, res: Response) {
        const { name } = req.body
        const owner = req.headers.id

        try {
            const count = await WealthnowPortfolioModel.find({ owner }).count()

            if (count < 100) {
                const clientId = crypto.randomBytes(16).toString("hex")
                const clientSecret = crypto.randomBytes(32).toString("hex")
                const portfolio = new WealthnowPortfolioModel({ owner, name })
                await portfolio.save()
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
            const portfolios = await WealthnowPortfolioModel.find({ owner: req.headers.id })
            let consolidatedAsset = 0

            for (const portfolio of portfolios) {
                const { owner, id: portfolioId } = portfolio
                const assets = await WealthnowAssetModel.find({ portfolioId, owner }).sort({ createdAt: -1 })
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
            const portfolio = await WealthnowPortfolioModel.findById(portfolioId)
            const { owner } = portfolio
            const assets = await WealthnowAssetModel.find({ portfolioId, owner }).sort({ createdAt: -1 })
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
            const portfolio = await WealthnowPortfolioModel.findById(req.params.id)

            if (portfolio.owner.toString() === req.headers.id) {
                await WealthnowAssetModel.deleteMany({ owner: req.headers.id, portfolioId: req.params.id })
                await WealthnowPortfolioModel.findByIdAndDelete(portfolio.id)
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
            const portfolio = await WealthnowPortfolioModel.findById(portfolioId)

            if (portfolio && portfolio.owner.toString() === userId) {
                const portfolioId = portfolio.id
                const asset = new WealthnowAssetModel({ owner: userId, portfolioId, principalAmount, rateOfInterest, tenure, maturityAmount, apiKey })
                await asset.save()
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
            const asset = await WealthnowAssetModel.findById(assetId)

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
            const asset = await WealthnowAssetModel.findById(assetId)
            if (asset && asset.owner.toString() === userId) {
                await WealthnowAssetModel.findByIdAndUpdate(assetId, { principalAmount, rateOfInterest, tenure, maturityAmount, createdAt })
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
            const asset = await WealthnowAssetModel.findById(req.params.id)
            if (asset && asset.owner.toString() === userId) {
                await WealthnowAssetModel.findByIdAndDelete(asset.id)
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