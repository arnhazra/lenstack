import { IsNotEmpty } from "class-validator"

export class CreateDataDto {
  @IsNotEmpty()
  key: string

  @IsNotEmpty()
  value: string
}