import { createHmac } from "crypto"
import { sendEmail } from "../events/send-email.event"
import { envConfig } from "src/env.config"
const { passkeyHashingKey } = envConfig

function generateRandomPassKey(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let randomPassKey = ""
  for (let i = 0; i < 9; i++) {
    if (i === 4) {
      randomPassKey += "-"
    }
    else {
      randomPassKey += characters.charAt(Math.floor(Math.random() * characters.length))
    }
  }

  return randomPassKey
}

export async function generateAuthPasskeyAndSendEmail(email: string): Promise<string> {
  const passKey = generateRandomPassKey()
  const ttl = 5 * 60 * 1000
  const expires = Date.now() + ttl
  const data = `${email}.${passKey}.${expires}`
  const hash = createHmac("sha256", passkeyHashingKey).update(data).digest("hex")
  const fullHash = `${hash}.${expires}`
  await sendEmail(email, passKey)
  return fullHash
}

export function verifyAuthPasskey(email: string, hash: string, passKey: string): boolean {
  let [hashValue, expires] = hash.split(".")
  let now = Date.now()
  if (now > parseInt(expires)) return false
  let data = `${email}.${passKey}.${expires}`
  let newCalculatedHash = createHmac("sha256", passkeyHashingKey).update(data).digest("hex")
  if (newCalculatedHash === hashValue) {
    return true
  }
  return false
}