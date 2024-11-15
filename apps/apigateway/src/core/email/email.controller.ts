import { Controller } from "@nestjs/common"
import { EmailService } from "./email.service"
import { SendEmailDto } from "./dto/send-email.dto"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "src/shared/utils/events.union"

@Controller()
export class EmailController {
  constructor(private readonly service: EmailService) {}

  @OnEvent(EventsUnion.SendEmail)
  async sendEmail(sendEmailDto: SendEmailDto) {
    await this.service.sendEmail(sendEmailDto)
  }
}
