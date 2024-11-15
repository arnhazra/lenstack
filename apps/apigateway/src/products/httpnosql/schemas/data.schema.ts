import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({
  versionKey: false,
  collection: "datas",
  timestamps: { createdAt: true, updatedAt: false },
})
export class Data extends Document {
  @Prop({ type: Types.ObjectId, ref: "workspace", required: true })
  workspaceId: Types.ObjectId

  @Prop({ required: true })
  key: string

  @Prop({ required: true, type: Object })
  value: Record<string, any> | Record<string, any>[] | string | string[]
}

export const DataSchema = SchemaFactory.createForClass(Data)
