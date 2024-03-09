import { BadRequestException, Injectable } from "@nestjs/common"
import { UpdateSustainabilityDto } from "./dto/update-sustainability.dto"
import updateSustainabilitySettingsCommand from "./commands/update-settings.command"

@Injectable()
export class SustainabilityService {
  async updateSettings(userId: string, updateSustainabilityDto: UpdateSustainabilityDto) {
    try {
      const { useDarkMode, useFastestNode, useLessEnergy, useOptimizedAPICalls } = updateSustainabilityDto
      return await updateSustainabilitySettingsCommand(userId, useDarkMode, useFastestNode, useLessEnergy, useOptimizedAPICalls)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
