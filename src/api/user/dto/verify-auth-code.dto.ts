import { PartialType } from "@nestjs/mapped-types"
import { RequestAuthCodeDto } from "./request-auth-code.dto"
import { IsNotEmpty } from "class-validator"

export class VerifyAuthCodeDto extends PartialType(RequestAuthCodeDto) {
  readonly name: string

  @IsNotEmpty()
  readonly otp: string

  @IsNotEmpty()
  readonly hash: string

  readonly privateKey: string
}
