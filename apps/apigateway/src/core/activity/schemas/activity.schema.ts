import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ versionKey: false, collection: "activities", timestamps: { createdAt: true, updatedAt: false } })
export class Activity extends Document {
  @Prop({ type: Types.ObjectId, ref: "user", required: true })
  userId: Types.ObjectId

  @Prop({ required: true })
  method: string

  @Prop({ required: true })
  apiUri: string
}

export const ActivitySchema = SchemaFactory.createForClass(Activity)