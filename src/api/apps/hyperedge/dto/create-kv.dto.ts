import { IsNotEmpty } from "class-validator"

export class CreateKvDto {
  @IsNotEmpty()
  key: string

  @IsNotEmpty()
  value: string

  @IsNotEmpty()
  dbId: string

  @IsNotEmpty()
  dbPassword: string
}