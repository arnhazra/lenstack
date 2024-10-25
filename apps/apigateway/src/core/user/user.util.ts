import { createHmac, randomInt } from "crypto"
import { envConfig } from "src/env.config"
const { otpHashingKey } = envConfig

function generateRandomOTP(): string {
  return randomInt(111111, 999999).toString()
}

export function generateOTP(email: string) {
  const otp = generateRandomOTP()
  const ttl = 5 * 60 * 1000
  const expires = Date.now() + ttl
  const data = `${email}.${otp}.${expires}`
  const hash = createHmac("sha256", otpHashingKey).update(data).digest("hex")
  const fullHash = `${hash}.${expires}`
  return { fullHash, otp }
}

export function verifyOTP(email: string, hash: string, otp: string): boolean {
  let [hashValue, expires] = hash.split(".")
  let now = Date.now()
  if (now > parseInt(expires)) return false
  let data = `${email}.${otp}.${expires}`
  let newCalculatedHash = createHmac("sha256", otpHashingKey)
    .update(data)
    .digest("hex")
  if (newCalculatedHash === hashValue) {
    return true
  }
  return false
}

export function generateOTPEmailSubject() {
  return `${envConfig.brandName} OTP`
}

export function generateOTPEmailBody(otp: string) {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #f1f3f4">
        <strong>
          <h1 style="color: #0f172a;text-decoration:none;font-weight:600">${envConfig.brandName}</h1>
        </strong>
      </div>
      <p style="font-size:1rem">Hello there</p>
      <p style="font-size:1rem">Use the below key as your ${envConfig.brandName} OTP. Do not share with anyone.</p>
      <p style="font-size:1rem">This OTP is valid only for 5 minutes.</p>
      <h2 style="background: #0f172a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 0.4rem;letter-spacing:0.2rem">${otp}</h2>
      <p style="font-size:0.9rem;">Warm Regards,<br />${envConfig.brandName} Team</p>
      <hr style="border:none;border-top:1px solid #f1f3f4" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>${envConfig.brandName}</p>
        <p>Worldwide</p>
      </div>
    </div>
  </div>`
}
