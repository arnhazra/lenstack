import { IsNotEmpty } from "class-validator"

export class GetAccessTokenDto {
  @IsNotEmpty()
  userId: string
}