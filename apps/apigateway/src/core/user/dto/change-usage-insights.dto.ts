import { IsBoolean } from "class-validator"

export class ChangeActivityLogSettingsDto {
  @IsBoolean()
  readonly activityLog: boolean
}
