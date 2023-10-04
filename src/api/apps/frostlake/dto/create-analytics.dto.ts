import { IsNotEmpty } from "class-validator"

export class CreateAnalyticsDto {
  @IsNotEmpty()
  component: string

  @IsNotEmpty()
  event: string

  @IsNotEmpty()
  info: string

  @IsNotEmpty()
  statusCode: string

  @IsNotEmpty()
  apiKey: string

  @IsNotEmpty()
  clientId: string

  @IsNotEmpty()
  clientSecret: string
}