import { IsEmail } from "class-validator"

export class GenerateAuthPasskeyDto {
  @IsEmail()
  readonly email: string
}
