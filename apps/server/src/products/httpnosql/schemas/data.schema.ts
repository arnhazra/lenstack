import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as MongooseSchema } from "mongoose"

@Schema({ versionKey: false, collection: "datas", timestamps: { createdAt: true, updatedAt: false } })
export class Data extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "organization", required: true })
  orgId: MongooseSchema.Types.ObjectId

  @Prop({ required: true })
  key: string

  @Prop({ required: true })
  value: string
}

export const DataSchema = SchemaFactory.createForClass(Data)
