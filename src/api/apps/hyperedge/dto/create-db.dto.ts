import { IsNotEmpty } from "class-validator"

export class CreateDbDto {
  @IsNotEmpty()
  name: string
}
