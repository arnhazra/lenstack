import { SustainabilityModel } from "../models/sustainability.model"

export default async function createSustainabilitySettingsCommand(userId: string, useEnergySaver: boolean, useOptimizedAPICalls: boolean) {
  const sustainability = new SustainabilityModel({ userId, useEnergySaver, useOptimizedAPICalls })
  await sustainability.save()
  return true
}