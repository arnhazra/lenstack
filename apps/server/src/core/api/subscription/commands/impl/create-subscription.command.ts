import { SubscriptionPlans } from "../../subscription.config"

export class CreateSubscriptionCommand {
  constructor(
    public readonly userId: string,
    public readonly selectedPlan: SubscriptionPlans,
  ) { }
}