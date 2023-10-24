import { IsNotEmpty } from "class-validator"

export class CreateTransactionDto {
  @IsNotEmpty()
  apiKey: string

  @IsNotEmpty()
  txId: string
}
