import { IsNotEmpty } from "class-validator"

export class SetAccessTokenDto {
  @IsNotEmpty()
  userId: string

  @IsNotEmpty()
  accessToken: string
}
