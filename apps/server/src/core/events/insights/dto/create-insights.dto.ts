import { IsNotEmpty } from "class-validator"

export class CreateInsightsDto {
  @IsNotEmpty()
  userId: string

  @IsNotEmpty()
  method: string

  @IsNotEmpty()
  apiUri: string
}
