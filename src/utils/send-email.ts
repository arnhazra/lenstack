import * as nodemailer from "nodemailer"
import { google } from "googleapis"
import { envConfig } from "../env.config"
import SMTPTransport from "nodemailer/lib/smtp-transport"

const { gcloudClientId, gcloudClientSecret, redirectUri, refreshToken, mailerEmail } = envConfig
const oAuth2Client = new google.auth.OAuth2(gcloudClientId, gcloudClientSecret, redirectUri)
oAuth2Client.setCredentials({ refresh_token: refreshToken })

export async function sendEmail(email: string, passKey: string): Promise<void> {
  try {
    const accessToken = await oAuth2Client.getAccessToken()

    const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: mailerEmail,
        accessToken: accessToken.token,
      }
    })

    const subject: string = `${envConfig.brandName} Identity Passkey`
    const content: string = `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
      <div style="background-color: #f4f4f4; padding: 20px; border-radius: 0.8rem; text-align: center;">
        <p style="font-size: 16px; color: #555; margin-top: 20px;">Use the below key as your ${envConfig.brandName} Identity Passkey. Do not share.</p>
        <div style="display: inline-block; background-color: #e0e0e0; padding: 10px 20px; border-radius: 0.8rem; font-size: 18px;">
          <span style="color: #333; font-weight: bold;">${passKey}</span>
        </div>
      </div>
    </div>`

    await transporter.sendMail({ from: mailerEmail, to: email, subject: subject, html: content })
  }

  catch (error) {
    throw error
  }
}