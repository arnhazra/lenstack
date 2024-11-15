import { IsNotEmpty } from "class-validator"

export class GetTokenDto {
  @IsNotEmpty()
  userId: string
}
