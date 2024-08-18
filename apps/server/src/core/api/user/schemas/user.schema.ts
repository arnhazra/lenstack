import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"
import { ComputeTier } from "../../pricing/pricing.config"

@Schema({ versionKey: false, collection: "users", timestamps: { createdAt: true, updatedAt: false } })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  name: string

  @Prop({ default: "user" })
  role: string

  @Prop({ required: true })
  walletBalance: number

  @Prop({ required: true, default: ComputeTier.Standard })
  computeTier: ComputeTier

  @Prop({ type: Boolean, default: true })
  reduceCarbonEmissions: boolean

  @Prop({ type: Boolean, default: true })
  activityLog: boolean

  @Prop({ type: Types.ObjectId, ref: "organization" })
  selectedOrgId: Types.ObjectId
}

export const UserSchema = SchemaFactory.createForClass(User)