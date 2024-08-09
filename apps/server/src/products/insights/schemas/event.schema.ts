import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ versionKey: false, collection: "events", timestamps: { createdAt: true, updatedAt: false } })
export class Events extends Document {
  @Prop({ type: Types.ObjectId, ref: "organization", required: true })
  readonly orgId: Types.ObjectId

  @Prop({ required: true, type: Object })
  readonly event: Record<string, any> | Record<string, any>[] | string | string[]
}

export const EventsSchema = SchemaFactory.createForClass(Events)