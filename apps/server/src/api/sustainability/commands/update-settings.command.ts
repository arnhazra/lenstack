import { SustainabilityModel } from "../models/sustainability.model"

export default async function updateSustainabilitySettingsCommand(userId: string,
  useDarkMode: boolean,
  useFastestNode: boolean,
  useLessEnergy: boolean,
  useOptimizedAPICalls: boolean) {
  await SustainabilityModel.findOneAndUpdate({ userId }, { useDarkMode, useFastestNode, useLessEnergy, useOptimizedAPICalls })
  return true
}