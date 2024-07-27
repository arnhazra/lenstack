import { IsNotEmpty } from "class-validator"

export class SendEmailDto {
  @IsNotEmpty()
  receiverEmail: string

  @IsNotEmpty()
  subject: string

  @IsNotEmpty()
  body: string
}
