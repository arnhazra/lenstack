import { BadRequestException, Injectable } from "@nestjs/common"
import { SendEmailDto } from "./dto/send-email.dto"
import * as nodemailer from "nodemailer"
import { google } from "googleapis"
import { envConfig } from "./env.config"
import SMTPTransport from "nodemailer/lib/smtp-transport"

@Injectable()
export class AppService {
  async sendEmail(sendEmailDto: SendEmailDto) {
    try {
      const { email, subject, body } = sendEmailDto
      const { gcloudClientId, gcloudClientSecret, redirectURI, refreshToken, mailerEmail } = envConfig
      const oAuth2Client = new google.auth.OAuth2(gcloudClientId, gcloudClientSecret, redirectURI)
      oAuth2Client.setCredentials({ refresh_token: refreshToken })
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

      await transporter.sendMail({ from: mailerEmail, to: email, subject, html: body })
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
