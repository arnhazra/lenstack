import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"
import { SubscriptionTier } from "../subscription.config"

@Schema({
  versionKey: false,
  collection: "subscriptions",
  timestamps: { createdAt: true, updatedAt: false },
})
export class Subscription extends Document {
  @Prop({ type: Types.ObjectId, ref: "user", required: true, unique: true })
  userId: Types.ObjectId

  @Prop({ required: true })
  subscriptionTier: SubscriptionTier

  @Prop({ required: true })
  xp: number

  @Prop({ required: true })
  purchasePrice: number

  @Prop({ required: true })
  platformDelay: number

  @Prop({
    type: Date,
    default: () => new Date(Date.now() + 86400 * 30 * 1000),
  })
  endsAt: Date
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription)
