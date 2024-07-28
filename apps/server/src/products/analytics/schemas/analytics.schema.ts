import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ versionKey: false, collection: "analytics", timestamps: { createdAt: "createdAt" } })
export class Analytics extends Document {
  @Prop({ type: Types.ObjectId, ref: "organization", required: true })
  readonly orgId: Types.ObjectId

  @Prop({ required: true })
  readonly component: string

  @Prop({ required: true })
  readonly event: string

  @Prop({ required: true })
  readonly info: string

  @Prop({ required: true })
  readonly statusCode: string

  @Prop({ default: Date.now })
  readonly createdAt: Date
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics)