import { TokenModel } from "../models/token.model"

export async function getTokens(searchQuery: string) {
  const tokens = await TokenModel.find({
    $or: [
      { tokenName: { $regex: searchQuery, $options: "i" } },
      { tokenSymbol: { $regex: searchQuery, $options: "i" } },
    ]
  })
  return tokens
}