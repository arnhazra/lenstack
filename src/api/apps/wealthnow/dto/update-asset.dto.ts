import { IsNotEmpty, IsNumber } from "class-validator"

export class UpdateAssetDto {
  @IsNumber()
  principalAmount: number

  @IsNumber()
  rateOfInterest: number

  @IsNumber()
  tenure: number

  @IsNumber()
  maturityAmount: number
}
