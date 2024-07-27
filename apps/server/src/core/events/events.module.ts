import { Module } from "@nestjs/common"
import { InsightsModule } from "./insights/insights.module"
import { EmailModule } from "./email/email.module"
import { AccesstokenModule } from "./accesstoken/accesstoken.module"

@Module({
  imports: [InsightsModule, EmailModule, AccesstokenModule]
})
export class EventsModule { }
