import { SustainabilityModel } from "../models/sustainability.model"

export default async function fetchSustainabilitySettings(userId: string) {
  return await SustainabilityModel.findOne({ userId })
}