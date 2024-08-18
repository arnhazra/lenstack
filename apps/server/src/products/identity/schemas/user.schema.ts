import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ versionKey: false, collection: "users", timestamps: { createdAt: true, updatedAt: false } })
export class User extends Document {
  @Prop({ type: Types.ObjectId, ref: "organization", required: true })
  orgId: Types.ObjectId

  @Prop({ required: true })
  email: string

  @Prop({ default: "user" })
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User)
