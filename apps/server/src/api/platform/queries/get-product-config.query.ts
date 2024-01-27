import { ProductModel } from "../models/products.model"

export async function getproductConfigQuery(searchQuery: string) {
  const products = await ProductModel.find({
    $or: [
      { productName: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } },
      { largeDescription: { $regex: searchQuery, $options: "i" } }
    ]
  }).sort("productName")

  return products
}