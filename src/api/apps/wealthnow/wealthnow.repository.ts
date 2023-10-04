import { Injectable } from "@nestjs/common"
import { MasterWealthnowPortfolioModel, ReplicaWealthnowPortfolioModel } from "./entities/wealthnow-portfolio.entity"
import { MasterWealthnowAssetModel, ReplicaWealthnowAssetModel } from "./entities/wealthnow-asset.entity"

@Injectable()
export class WealthnowRepository {
  async findPortfoliosByUserId(userId: string) {
    const portfolios = await MasterWealthnowPortfolioModel.find({ owner: userId })
    return portfolios
  }

  async createPortfolio(userId: string, name: string) {
    const portfolio = new MasterWealthnowPortfolioModel({ owner: userId, name })
    await portfolio.save()
    const portfolioReplica = new ReplicaWealthnowPortfolioModel({ _id: portfolio.id, owner: userId, name })
    await portfolioReplica.save()
    return portfolio
  }

  async findPortfolioById(portfolioId: string) {
    const portfolio = await MasterWealthnowPortfolioModel.findById(portfolioId)
    return portfolio
  }

  async findAssetsByPortfolioAndUserId(userId: string, portfolioId: string) {
    const assets = await MasterWealthnowAssetModel.find({ portfolioId, owner: userId }).sort({ createdAt: -1 })
    return assets
  }

  async deletePortfolio(userId: string, portfolioId: string) {
    await MasterWealthnowAssetModel.deleteMany({ owner: userId, portfolioId: portfolioId })
    await ReplicaWealthnowAssetModel.deleteMany({ owner: userId, portfolioId: portfolioId })
    await MasterWealthnowPortfolioModel.findByIdAndDelete(portfolioId)
    await ReplicaWealthnowPortfolioModel.findByIdAndDelete(portfolioId)
    return true
  }

  async createAsset(userId: string, portfolioId: string, principalAmount: number, rateOfInterest: number, tenure: number, maturityAmount: number, apiKey: string) {
    const asset = new MasterWealthnowAssetModel({ owner: userId, portfolioId, principalAmount, rateOfInterest, tenure, maturityAmount, apiKey })
    await asset.save()
    const assetReplica = new ReplicaWealthnowAssetModel({ _id: asset.id, owner: userId, portfolioId, principalAmount, rateOfInterest, tenure, maturityAmount, apiKey })
    await assetReplica.save()
    return asset
  }

  async findAssetById(assetId: string) {
    const asset = await MasterWealthnowAssetModel.findById(assetId)
    return asset
  }

  async updateAsset(assetId: string, principalAmount: number, rateOfInterest: number, tenure: number, maturityAmount: number) {
    await MasterWealthnowAssetModel.findByIdAndUpdate(assetId, { principalAmount, rateOfInterest, tenure, maturityAmount })
    await ReplicaWealthnowAssetModel.findByIdAndUpdate(assetId, { principalAmount, rateOfInterest, tenure, maturityAmount })
    return true
  }

  async deleteAssetById(assetId: string) {
    await MasterWealthnowAssetModel.findByIdAndDelete(assetId)
    await ReplicaWealthnowAssetModel.findByIdAndDelete(assetId)
    return true
  }
}
