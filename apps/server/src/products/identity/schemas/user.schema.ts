import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ versionKey: false, collection: "users", timestamps: { createdAt: true, updatedAt: false } })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ default: "user" })
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User)
