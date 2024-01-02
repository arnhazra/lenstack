import { activityConfig } from "src/config/activity.config"

export default function getActivityDescription(url: string): string {
  const defaultDescription = "Unknown Activity"
  const configKeys = Object.keys(activityConfig)
  const matchingKey = configKeys.find(key => url.includes(key))
  if (matchingKey) {
    return activityConfig[matchingKey]
  }

  return defaultDescription
}