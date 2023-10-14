import { IsEthereumAddress, IsNotEmpty } from "class-validator"

export class CreateTransactionDto {
  @IsNotEmpty()
  apiKey: string

  @IsEthereumAddress()
  from: string

  @IsEthereumAddress()
  to: string

  @IsNotEmpty()
  amount: string
}
