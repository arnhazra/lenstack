import { IsNotEmpty } from "class-validator"
export class SubscribeDto {
  @IsNotEmpty()
  readonly tokenId: string

  @IsNotEmpty()
  readonly selectedPlan: string

  @IsNotEmpty()
  readonly transactionHash: string
}
