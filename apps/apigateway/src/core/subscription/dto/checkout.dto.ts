import { IsNotEmpty } from "class-validator"
import { SubscriptionTier } from "../subscription.config"

export class CreateCheckoutSessionDto {
  @IsNotEmpty()
  readonly tier: SubscriptionTier
}
