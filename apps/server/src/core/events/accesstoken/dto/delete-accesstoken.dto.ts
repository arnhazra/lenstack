import { IsNotEmpty } from "class-validator"

export class DeleteAccessTokenDto {
  @IsNotEmpty()
  userId: string
}