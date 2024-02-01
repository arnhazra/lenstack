import { IsEmail } from "class-validator"

export class GenerateIdentityPasskeyDto {
  @IsEmail()
  readonly email: string
}
