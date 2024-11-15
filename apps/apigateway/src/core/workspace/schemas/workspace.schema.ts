import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({
  versionKey: false,
  collection: "workspaces",
  timestamps: { createdAt: true, updatedAt: false },
})
export class Workspace extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ type: Types.ObjectId, ref: "user", required: true })
  userId: Types.ObjectId

  @Prop({ required: true })
  accessKey: string
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace)
