import { Injectable } from "@nestjs/common"
import { WealthnowPortfolioModel } from "./entities/wealthnow-portfolio.entity"
import { WealthnowAssetModel } from "./entities/wealthnow-asset.entity"

@Injectable()
export class WealthnowRepository {
  async findPortfoliosByUserId(userId: string) {
    const portfolios = await WealthnowPortfolioModel.find({ owner: userId })
    return portfolios
  }

  async createPortfolio(userId: string, name: string) {
    const portfolio = new WealthnowPortfolioModel({ owner: userId, name })
    await portfolio.save()
    return portfolio
  }

  async findPortfolioById(portfolioId: string) {
    const portfolio = await WealthnowPortfolioModel.findById(portfolioId)
    return portfolio
  }

  async findAssetsByPortfolioAndUserId(userId: string, portfolioId: string) {
    const assets = await WealthnowAssetModel.find({ portfolioId, owner: userId }).sort({ createdAt: -1 })
    return assets
  }

  async deletePortfolio(userId: string, portfolioId: string) {
    await WealthnowAssetModel.deleteMany({ owner: userId, portfolioId: portfolioId })
    await WealthnowPortfolioModel.findByIdAndDelete(portfolioId)
    return true
  }

  async createAsset(userId: string, portfolioId: string, principalAmount: number, rateOfInterest: number, tenure: number, maturityAmount: number, apiKey: string) {
    const asset = new WealthnowAssetModel({ owner: userId, portfolioId, principalAmount, rateOfInterest, tenure, maturityAmount, apiKey })
    await asset.save()
    return asset
  }

  async findAssetById(assetId: string) {
    const asset = await WealthnowAssetModel.findById(assetId)
    return asset
  }

  async updateAsset(assetId: string, principalAmount: number, rateOfInterest: number, tenure: number, maturityAmount: number) {
    await WealthnowAssetModel.findByIdAndUpdate(assetId, { principalAmount, rateOfInterest, tenure, maturityAmount })
    return true
  }

  async deleteAssetById(assetId: string) {
    await WealthnowAssetModel.findByIdAndDelete(assetId)
    return true
  }

  async findCountByApiKey(apiKey: string) {
    const wealthnowUsedCredits = await WealthnowAssetModel.find({ apiKey }).countDocuments()
    return wealthnowUsedCredits
  }
}
