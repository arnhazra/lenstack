import { IsEthereumAddress, IsNotEmpty } from "class-validator"

export class CreateTransactionDto {
  @IsEthereumAddress()
  from: string

  @IsEthereumAddress()
  to: string

  @IsNotEmpty()
  amount: string
}
