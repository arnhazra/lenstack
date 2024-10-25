import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ versionKey: false, collection: "products" })
export class Product extends Document {
  @Prop({ required: true, unique: true })
  productName: string;

  @Prop({ required: true, unique: true })
  displayName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  productStatus: string;

  @Prop({ required: true })
  productCategory: string;

  @Prop({ required: true })
  productIcon: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
