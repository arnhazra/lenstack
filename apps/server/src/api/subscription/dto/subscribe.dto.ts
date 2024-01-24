import { IsNotEmpty } from "class-validator"
import { SubscriptionPlans } from "../subscription.config"

export class SubscribeDto {
  @IsNotEmpty()
  readonly selectedPlan: SubscriptionPlans

  @IsNotEmpty()
  readonly transactionHash: string
}
