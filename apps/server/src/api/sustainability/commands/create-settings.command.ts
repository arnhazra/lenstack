import { SustainabilityModel } from "../models/sustainability.model"

export default async function createSustainabilitySettingsCommand(userId: string,
  useDarkMode: boolean,
  useFastestNode: boolean,
  useLessEnergy: boolean,
  useOptimizedAPICalls: boolean) {
  const sustainability = new SustainabilityModel({ userId, useDarkMode, useFastestNode, useLessEnergy, useOptimizedAPICalls })
  await sustainability.save()
  return true
}