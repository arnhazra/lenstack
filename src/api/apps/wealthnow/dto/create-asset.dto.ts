import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateAssetDto {
  @IsNotEmpty()
  portfolioId: string

  @IsNumber()
  principalAmount: number

  @IsNumber()
  rateOfInterest: number

  @IsNumber()
  tenure: number

  @IsNumber()
  maturityAmount: number

  @IsNotEmpty()
  apiKey: string
}
