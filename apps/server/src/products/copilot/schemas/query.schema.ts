import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ versionKey: false, collection: "queries", timestamps: { createdAt: true, updatedAt: false } })
export class Query extends Document {
  @Prop({ type: Types.ObjectId, ref: "organization", required: true })
  readonly orgId: Types.ObjectId

  @Prop({ required: true })
  readonly prompt: string

  @Prop({ required: true })
  readonly response: string

  @Prop({ type: Date, default: Date.now })
  readonly createdAt: Date
}

export const QuerySchema = SchemaFactory.createForClass(Query)