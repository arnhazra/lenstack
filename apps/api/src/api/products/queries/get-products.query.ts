import { ProductModel } from "../models/products.model"

export async function getproductConfigQuery(searchQuery: string, selectedFilterCategory: string) {
  const products = await ProductModel.find({
    $or: [
      { productName: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } },
    ],
    productCategory: { $regex: selectedFilterCategory }
  }).sort("productName")

  return products
}