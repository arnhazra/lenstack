import { IsNotEmpty } from "class-validator"

export class CreateInsightDto {
  @IsNotEmpty()
  userId: string

  @IsNotEmpty()
  module: string

  @IsNotEmpty()
  method: string

  @IsNotEmpty()
  api: string
}
