const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const dotenv = require('dotenv').config()
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URI
const refreshToken = process.env.REFRESH_TOKEN
const user = process.env.MAILER_UN
const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)

oAuth2Client.setCredentials({ refresh_token: refreshToken })

async function sendmail(email, otp) {
    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { type: 'OAuth2', user, clientId, clientSecret, refreshToken, accessToken }
        })
        const subject = 'Lenstack Authcode'
        const content = `Use ${otp} as your Authcode. Do not share with anyone.`
        await transporter.sendMail({ from: user, to: email, subject: subject, html: content })
    }

    catch (error) {
        throw error
    }
}

module.exports = sendmail