import { IsNotEmpty } from "class-validator"

export class CreateKvDto {
  @IsNotEmpty()
  key: string

  @IsNotEmpty()
  value: string
}