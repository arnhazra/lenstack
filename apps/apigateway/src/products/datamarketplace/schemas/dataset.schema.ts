import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ versionKey: false, collection: "datasets" })
export class Dataset extends Document {
  @Prop({ type: Types.ObjectId, ref: "metadatas", required: true })
  datasetRelationId: Types.ObjectId

  @Prop({ type: Object, required: true })
  data: Record<string, any>[]
}

export const DatasetSchema = SchemaFactory.createForClass(Dataset)
