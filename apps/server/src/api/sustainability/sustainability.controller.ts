import { Controller, Body, Patch, Param, BadRequestException } from "@nestjs/common"
import { SustainabilityService } from "./sustainability.service"
import { UpdateSustainabilityDto } from "./dto/update-sustainability.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"

@Controller("sustainability")
export class SustainabilityController {
  constructor(private readonly sustainabilityService: SustainabilityService) { }

  @Patch("/updatesettings")
  async updateSettings(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() updateSustainabilityDto: UpdateSustainabilityDto) {
    try {
      return await this.sustainabilityService.updateSettings(uft.userId, updateSustainabilityDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
