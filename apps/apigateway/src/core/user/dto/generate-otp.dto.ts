import { IsEmail } from "class-validator"

export class GenerateOTPDto {
  @IsEmail()
  readonly email: string
}
