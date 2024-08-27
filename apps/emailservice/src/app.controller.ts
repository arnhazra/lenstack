import { Controller } from "@nestjs/common"
import { AppService } from "./app.service"
import { SendEmailDto } from "./dto/send-email.dto"
import { MessagePattern } from "@nestjs/microservices"

@Controller()
export class AppController {
  constructor(private readonly service: AppService) { }

  @MessagePattern("sendEmail")
  async sendEmail(sendEmailDto: SendEmailDto) {
    await this.service.sendEmail(sendEmailDto)
  }
}
