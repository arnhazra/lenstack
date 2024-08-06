import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as MongooseSchema } from "mongoose"

@Schema({ versionKey: false, collection: "datasets" })
export class Dataset extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "metadatas", required: true })
  datasetRelationId: MongooseSchema.Types.ObjectId

  @Prop({ type: Object, required: true })
  data: Record<string, any>[]
}

export const DatasetSchema = SchemaFactory.createForClass(Dataset)
