import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as MongooseSchema } from "mongoose"

@Schema({ versionKey: false, collection: "activities", timestamps: { createdAt: true, updatedAt: false } })
export class Activity extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "user", required: true })
  userId: MongooseSchema.Types.ObjectId

  @Prop({ required: true })
  method: string

  @Prop({ required: true })
  apiUri: string
}

export const ActivitySchema = SchemaFactory.createForClass(Activity)