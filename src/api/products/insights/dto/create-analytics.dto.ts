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
  projectId: string

  @IsNotEmpty()
  projectPasskey: string
}