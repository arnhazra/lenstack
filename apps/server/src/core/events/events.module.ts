import { Module } from "@nestjs/common"
import { ActivityModule } from "./activity/activity.module"
import { EmailModule } from "./email/email.module"
import { TokenModule } from "./token/token.module"

@Module({
  imports: [ActivityModule, EmailModule, TokenModule]
})
export class EventsModule { }
