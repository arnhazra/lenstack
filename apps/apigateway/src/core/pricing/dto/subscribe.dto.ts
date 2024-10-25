import { IsNotEmpty } from "class-validator";
import { ComputeTier } from "../pricing.config";

export class SubscribeDto {
  @IsNotEmpty()
  readonly computeTier: ComputeTier;

  @IsNotEmpty()
  readonly transactionHash: string;
}
