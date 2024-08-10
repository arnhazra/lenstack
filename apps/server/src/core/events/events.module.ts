import { Module } from "@nestjs/common"
import { ActivityModule } from "./activity/activity.module"
import { EmailModule } from "./email/email.module"
import { AccesstokenModule } from "./accesstoken/accesstoken.module"

@Module({
  imports: [ActivityModule, EmailModule, AccesstokenModule]
})
export class EventsModule { }
