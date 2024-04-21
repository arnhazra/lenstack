import { IsNotEmpty } from "class-validator"
import { SubscriptionPlans } from "../subscription.config"

export class CreateCheckoutSessionDto {
  @IsNotEmpty()
  readonly selectedPlan: SubscriptionPlans
}
