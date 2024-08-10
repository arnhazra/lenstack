import { IsNotEmpty } from "class-validator"

export class CreateActivityDto {
  @IsNotEmpty()
  userId: string

  @IsNotEmpty()
  method: string

  @IsNotEmpty()
  apiUri: string
}
