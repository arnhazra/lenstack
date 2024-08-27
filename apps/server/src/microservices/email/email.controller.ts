import { Controller } from "@nestjs/common"
import { EmailService } from "./email.service"
import { SendEmailDto } from "./dto/send-email.dto"
import { EventsUnion } from "../events.union"
import { MessagePattern } from "@nestjs/microservices"

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @MessagePattern(EventsUnion.SendEmail)
  async sendEmail(sendEmailDto: SendEmailDto) {
    await this.emailService.sendEmail(sendEmailDto)
  }
}
