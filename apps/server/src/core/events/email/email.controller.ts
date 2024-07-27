import { Controller } from "@nestjs/common"
import { EmailService } from "./email.service"
import { SendEmailDto } from "./dto/send-email.dto"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "../events.union"

@Controller("email")
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @OnEvent(EventsUnion.SendEmail)
  async sendEmail(sendEmailDto: SendEmailDto) {
    await this.emailService.sendEmail(sendEmailDto)
  }
}
