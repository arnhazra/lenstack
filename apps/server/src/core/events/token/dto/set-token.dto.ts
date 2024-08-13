import { IsNotEmpty } from "class-validator"

export class SetTokenDto {
  @IsNotEmpty()
  userId: string

  @IsNotEmpty()
  token: string
}
