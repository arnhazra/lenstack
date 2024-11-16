import { envConfig } from "src/config"
import {
  devAPIUri,
  devUIUri,
  prodAPIUri,
  prodUIUri,
} from "src/shared/utils/constants/other-constants"

export function getRediretUriUI(success: boolean) {
  if (success) {
    return envConfig.nodeEnv === "development"
      ? `${devUIUri}/settings/subscription?subscriptionSuccess=true`
      : `${prodUIUri}/settings/subscription?subscriptionSuccess=true`
  } else {
    return envConfig.nodeEnv === "development"
      ? `${devUIUri}/settings/subscription?subscriptionSuccess=false`
      : `${prodUIUri}/settings/subscription?subscriptionSuccess=false`
  }
}

export function getRediretUriAPI(success: boolean) {
  if (success) {
    return envConfig.nodeEnv === "development"
      ? `${devAPIUri}/subscribe`
      : `${prodAPIUri}/subscribe`
  } else {
    return envConfig.nodeEnv === "development"
      ? `${devAPIUri}/cancel`
      : `${prodAPIUri}/cancel`
  }
}
