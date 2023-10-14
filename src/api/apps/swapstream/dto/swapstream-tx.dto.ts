import { IsEthereumAddress, IsNotEmpty } from "class-validator"

export class SwapstreamTransactionDto {
  @IsNotEmpty()
  apiKey: string

  @IsEthereumAddress()
  tokenContractAddress: string

  @IsNotEmpty()
  amount: string

  @IsNotEmpty()
  transactionType: string
}
