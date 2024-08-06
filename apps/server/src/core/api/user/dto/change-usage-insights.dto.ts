import { IsBoolean } from "class-validator"

export class ChangeUsageInsightsSettingsDto {
  @IsBoolean()
  readonly usageInsights: boolean
}
