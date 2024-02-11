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
    const content: string = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #f1f3f4">
        <strong>
          <h1 style="color: #2b3336;text-decoration:none;font-weight:600">${envConfig.brandName}</h1>
        </strong>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Use the below key as your ${envConfig.brandName} Identity Passkey. Do not share with anyone.</p>
      <h2 style="background: #2b3336;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 0.8rem;">${passKey}</h2>
      <p style="font-size:0.9em;">Regards,<br />${envConfig.brandName}</p>
      <hr style="border:none;border-top:1px solid #f1f3f4" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>${envConfig.brandName}</p>
        <p>Worldwide</p>
      </div>
    </div>
  </div>`

    await transporter.sendMail({ from: mailerEmail, to: email, subject: subject, html: content })
  }

  catch (error) {
    throw error
  }
}