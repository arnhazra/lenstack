import { IsBoolean } from "class-validator"

export class UpdateCarbonSettingsDto {
  @IsBoolean()
  readonly reduceCarbonEmissions: boolean
}
