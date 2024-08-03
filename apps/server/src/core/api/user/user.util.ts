import { createHmac } from "crypto"
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



export function generateAuthPasskey(email: string) {
  const passKey = generateRandomPassKey()
  const ttl = 5 * 60 * 1000
  const expires = Date.now() + ttl
  const data = `${email}.${passKey}.${expires}`
  const hash = createHmac("sha256", passkeyHashingKey).update(data).digest("hex")
  const fullHash = `${hash}.${expires}`
  return { fullHash, passKey }
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

export function generatePasskeyEmailSubject() {
  return `${envConfig.brandName} Auth Passkey`
}

export function generatePasskeyEmailBody(passKey: string) {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #f1f3f4">
        <strong>
          <h1 style="color: #2b3336;text-decoration:none;font-weight:600">${envConfig.brandName}</h1>
        </strong>
      </div>
      <p style="font-size:1rem">Hello there, ✌️</p>
      <p style="font-size:1rem">Use the below key as your ${envConfig.brandName} Auth Passkey. Do not share with anyone.</p>
      <h2 style="background: #2b3336;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 0.8rem;">${passKey}</h2>
      <p style="font-size:0.9rem;">Warm Regards,<br />${envConfig.brandName} Team</p>
      <hr style="border:none;border-top:1px solid #f1f3f4" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>${envConfig.brandName}</p>
        <p>Worldwide</p>
      </div>
    </div>
  </div>`
}