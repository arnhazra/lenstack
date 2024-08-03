import { Module } from "@nestjs/common"
import { SubscriptionService } from "./subscription.service"
import { SubscriptionController } from "./subscription.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { MongooseModule } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Subscription, SubscriptionSchema } from "./schemas/subscription.schema"
import { FindSubscriptionQueryHandler } from "./queries/handlers/find-subscription.handler"
import { DeleteSubscriptionCommandHandler } from "./commands/handlers/delete-subscription.handler"
import { CreateSubscriptionCommandHandler } from "./commands/handlers/create-subscription.handler"

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }], DbConnectionMap.Core),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, CreateSubscriptionCommandHandler, DeleteSubscriptionCommandHandler, FindSubscriptionQueryHandler],
})

export class SubscriptionModule { }
