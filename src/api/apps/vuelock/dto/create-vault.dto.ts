import { IsNotEmpty } from "class-validator"

export class CreateVaultDto {
  @IsNotEmpty()
  name: string
}
