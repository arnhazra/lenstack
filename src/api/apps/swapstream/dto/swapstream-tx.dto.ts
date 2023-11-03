import { IsEthereumAddress, IsNotEmpty } from "class-validator"

export class SwapstreamTransactionDto {
  @IsEthereumAddress()
  tokenContractAddress: string

  @IsNotEmpty()
  amount: string

  @IsNotEmpty()
  transactionType: string
}
