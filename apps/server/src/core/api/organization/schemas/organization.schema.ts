import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema({ versionKey: false, collection: "organizations", timestamps: { createdAt: true, updatedAt: false } })
export class Organization extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ type: Types.ObjectId, ref: 'user', required: true })
  userId: Types.ObjectId

  @Prop({ required: true })
  clientId: string

  @Prop({ required: true })
  clientSecret: string
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization)