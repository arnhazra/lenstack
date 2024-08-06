import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as MongooseSchema } from "mongoose"

@Schema({ versionKey: false, collection: "subscriptions", timestamps: { createdAt: true, updatedAt: false } })
export class Subscription extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "user", required: true, unique: true })
  userId: MongooseSchema.Types.ObjectId

  @Prop({ required: true })
  selectedPlan: string

  @Prop({ required: true })
  remainingCredits: number

  @Prop({
    type: Date,
    default: () => {
      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 30)
      return expirationDate
    }
  })
  expiresAt: Date
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription)
