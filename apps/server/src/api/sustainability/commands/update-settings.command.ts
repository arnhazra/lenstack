import { SustainabilityModel } from "../models/sustainability.model"

export default async function updateSustainabilitySettingsCommand(userId: string, useEnergySaver: boolean, useOptimizedAPICalls: boolean) {
  await SustainabilityModel.findOneAndUpdate({ userId }, { useEnergySaver, useOptimizedAPICalls })
  return true
}