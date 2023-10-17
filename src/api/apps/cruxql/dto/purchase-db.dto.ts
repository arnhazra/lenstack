import { IsNotEmpty } from "class-validator"

export class PurchaseDbDto {
  @IsNotEmpty()
  apiKey: string

  @IsNotEmpty()
  dbId: string
}
