import { IsNotEmpty } from "class-validator"

export class DeleteTokenDto {
  @IsNotEmpty()
  userId: string
}
