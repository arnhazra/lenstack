import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { CreatePortfolioDto } from "./dto/create-portfolio.dto"
import { CreateAssetDto } from "./dto/create-asset.dto"
import { WealthnowRepository } from "./wealthnow.repository"
import { UpdateAssetDto } from "./dto/update-asset.dto"

@Injectable()
export class WealthnowService {
  constructor(private readonly wealthnowRepository: WealthnowRepository) { }

  async createPortfolio(userId: string, createWealthnowDto: CreatePortfolioDto) {
    try {
      const { name } = createWealthnowDto
      const portfolioCount = (await this.wealthnowRepository.findPortfoliosByUserId(userId)).length
      if (portfolioCount < 100) {
        const portfolio = await this.wealthnowRepository.createPortfolio(userId, name)
        return portfolio
      }

      else {
        throw new BadRequestException()
      }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getPortfolios(userId: string) {
    try {
      const portfolios = await this.wealthnowRepository.findPortfoliosByUserId(userId)
      let consolidatedAsset = 0

      for (const portfolio of portfolios) {
        const { owner, id: portfolioId } = portfolio
        const assets = await this.wealthnowRepository.findAssetsByPortfolioAndUserId(owner.toString(), portfolioId)
        let totalAssetUnderPortfolio = 0

        assets.forEach(asset => totalAssetUnderPortfolio += asset.principalAmount)
        consolidatedAsset += totalAssetUnderPortfolio
      }

      return { portfolios, consolidatedAsset }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async viewPortfolio(userId: string, portfolioId: string) {
    try {
      const portfolio = await this.wealthnowRepository.findPortfolioById(portfolioId)

      if (portfolio.owner.toString() === userId) {
        const assets = await this.wealthnowRepository.findAssetsByPortfolioAndUserId(userId, portfolioId)
        let totalAssetUnderPortfolio = 0
        assets.forEach(asset => totalAssetUnderPortfolio += asset.principalAmount)
        return { portfolio, assets, totalAssetUnderPortfolio }
      }

      else {
        throw new NotFoundException()
      }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async deletePortfolio(userId: string, portfolioId: string) {
    try {
      const { owner } = await this.wealthnowRepository.findPortfolioById(portfolioId)

      if (owner.toString() === userId) {
        await this.wealthnowRepository.deletePortfolio(userId, portfolioId)
      }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async createAsset(userId: string, createAssetDto: CreateAssetDto) {
    try {
      const { portfolioId, principalAmount, rateOfInterest, tenure, maturityAmount, apiKey } = createAssetDto
      const portfolio = await this.wealthnowRepository.findPortfolioById(portfolioId)

      if (portfolio.owner.toString() === userId) {
        const asset = await this.wealthnowRepository.createAsset(userId, portfolio.id, principalAmount, rateOfInterest, tenure, maturityAmount, apiKey)
        return asset
      }

      else {
        throw new BadRequestException()
      }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async viewAsset(userId: string, assetId: string) {
    try {
      const asset = await this.wealthnowRepository.findAssetById(assetId)
      if (asset.owner.toString() === userId) {
        return asset
      }

      else {
        throw new NotFoundException()
      }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  async editAsset(userId: string, assetId: string, updateAssetDto: UpdateAssetDto) {
    try {
      const { principalAmount, rateOfInterest, tenure, maturityAmount } = updateAssetDto
      const { owner } = await this.wealthnowRepository.findAssetById(assetId)

      if (owner.toString() === userId) {
        await this.wealthnowRepository.updateAsset(assetId, principalAmount, rateOfInterest, tenure, maturityAmount)
      }

      else {
        throw new NotFoundException()
      }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  async deleteAsset(userId: string, assetId: string) {
    try {
      const asset = await this.wealthnowRepository.findAssetById(assetId)
      if (asset.owner.toString() === userId) {
        await this.wealthnowRepository.deleteAssetById(assetId)
        return true
      }

      else {
        throw new NotFoundException()
      }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }
}
