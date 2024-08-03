import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ versionKey: false, collection: "solutions" })
export class Solution extends Document {
  @Prop({ required: true, unique: true })
  solutionName: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  solutionIcon: string
}

export const SolutionSchema = SchemaFactory.createForClass(Solution)