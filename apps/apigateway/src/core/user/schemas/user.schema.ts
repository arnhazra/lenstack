import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({
  versionKey: false,
  collection: "users",
  timestamps: { createdAt: true, updatedAt: false },
})
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  name: string

  @Prop({ default: "user" })
  role: string

  @Prop({ type: Boolean, default: true })
  hasTrial: boolean

  @Prop({ type: Boolean, default: true })
  reduceCarbonEmissions: boolean

  @Prop({ type: Boolean, default: true })
  activityLog: boolean

  @Prop({ type: Types.ObjectId, ref: "workspace" })
  selectedWorkspaceId: Types.ObjectId
}

export const UserSchema = SchemaFactory.createForClass(User)
