import { Controller, Post, Body, Patch, Query, Delete, BadRequestException, NotFoundException } from "@nestjs/common"
import { WealthnowService } from "./wealthnow.service"
import { CreatePortfolioDto } from "./dto/create-portfolio.dto"
import { CreateAssetDto } from "./dto/create-asset.dto"
import { TokenAuthorizer } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { ApiKeyAuthorizer } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"
import { UpdateAssetDto } from "./dto/update-asset.dto"

@Controller("wealthnow")
export class WealthnowController {
  constructor(private readonly wealthnowService: WealthnowService) { }

  @Post("createportfolio")
  async createPortfolio(@TokenAuthorizer() userId: string, @Body() createWealthnowDto: CreatePortfolioDto) {
    try {
      const portfolio = await this.wealthnowService.createPortfolio(userId, createWealthnowDto)
      return { portfolio }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("getportfolios")
  async getPortfolios(@TokenAuthorizer() userId: string) {
    try {
      const { portfolios, consolidatedAsset } = await this.wealthnowService.getPortfolios(userId)
      return { portfolios, consolidatedAsset }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("viewportfolio")
  async viewPortfolio(@TokenAuthorizer() userId: string, @Query("portfolioId") portfolioId: string) {
    try {
      const { portfolio, assets, totalAssetUnderPortfolio } = await this.wealthnowService.viewPortfolio(userId, portfolioId)
      return { portfolio, assets, totalAssetUnderPortfolio }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Delete("deleteportfolio")
  async deletePortfolio(@TokenAuthorizer() userId: string, @Query("portfolioId") portfolioId: string) {
    try {
      await this.wealthnowService.deletePortfolio(userId, portfolioId)
      return true
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Post("createasset")
  async createAsset(@ApiKeyAuthorizer() userId: string, @Body() createAssetDto: CreateAssetDto) {
    try {
      await this.wealthnowService.createAsset(userId, createAssetDto)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("viewasset")
  async viewAsset(@TokenAuthorizer() userId: string, @Query("assetId") assetId: string) {
    try {
      const asset = await this.wealthnowService.viewAsset(userId, assetId)
      return { asset }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Patch("editasset")
  async editAsset(@TokenAuthorizer() userId: string, @Query("assetId") assetId: string, @Body() updateAssetDto: UpdateAssetDto) {
    try {
      await this.wealthnowService.editAsset(userId, assetId, updateAssetDto)
      return true
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Delete("deleteasset")
  async deleteAsset(@TokenAuthorizer() userId: string, @Query("assetId") assetId: string) {
    try {
      await this.wealthnowService.deleteAsset(userId, assetId)
      return true
    }

    catch (error) {
      throw new NotFoundException()
    }
  }
}
