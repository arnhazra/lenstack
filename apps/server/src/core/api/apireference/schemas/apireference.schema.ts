import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ versionKey: false, collection: "apireferences" })
export class ApiReference extends Document {
  @Prop({ required: true })
  productName: string

  @Prop({ required: true })
  apiName: string

  @Prop({ required: true })
  apiUri: string

  @Prop({ required: true })
  apiMethod: string

  @Prop({ required: true, type: Object })
  sampleRequestBody: Record<string, any>

  @Prop({ required: true, type: Object })
  sampleResponseBody: Record<string, any>
}

export const ApiReferenceSchema = SchemaFactory.createForClass(ApiReference)