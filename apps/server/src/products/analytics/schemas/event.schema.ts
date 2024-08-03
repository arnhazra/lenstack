import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ versionKey: false, collection: "events", timestamps: { createdAt: true, updatedAt: false } })
export class Events extends Document {
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
}

export const EventsSchema = SchemaFactory.createForClass(Events)