import { createHmac } from "crypto"
import { sendEmail } from "./sendEmail"
import { envConfig } from "src/config/envConfig"
const key = envConfig.otpKey

export async function createAuthCodeAndSendEmail(email: string) {
  const otp = Math.floor(100000 + Math.random() * 900000)
  const ttl = 5 * 60 * 1000
  const expires = Date.now() + ttl
  const data = `${email}.${otp}.${expires}`
  const hash = createHmac("sha256", key).update(data).digest("hex")
  const fullHash = `${hash}.${expires}`
  await sendEmail(email, otp)
  return fullHash
}

export function verifyAuthCode(email: string, hash: string, otp: string) {
  let [hashValue, expires] = hash.split(".")
  let now = Date.now()
  if (now > parseInt(expires)) return false
  let data = `${email}.${otp}.${expires}`
  let newCalculatedHash = createHmac("sha256", key).update(data).digest("hex")
  if (newCalculatedHash === hashValue) {
    return true
  }
  return false
}