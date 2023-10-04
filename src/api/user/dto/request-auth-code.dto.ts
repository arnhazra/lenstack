import { IsEmail } from "class-validator"
export class RequestAuthCodeDto {
  @IsEmail()
  readonly email: string
}
