import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ versionKey: false, collection: "metadatas" })
export class Metadata extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  category: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  rating: number
}

export const MetadataSchema = SchemaFactory.createForClass(Metadata)
