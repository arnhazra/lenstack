import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ versionKey: false, collection: "rpcnodes" })
export class RpcNodes extends Document {
  @Prop({ required: true })
  readonly rpcProviderName: string

  @Prop({ required: true })
  readonly rpcGateway: string

  @Prop({ required: true })
  readonly rpcChain: string

  @Prop({ required: true })
  readonly rpcNetwork: string

  @Prop({ required: true })
  readonly rpcProviderUri: string
}

export const RpcNodesSchema = SchemaFactory.createForClass(RpcNodes)