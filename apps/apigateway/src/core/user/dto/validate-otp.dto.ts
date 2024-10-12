import { PartialType } from "@nestjs/mapped-types"
import { GenerateOTPDto } from "./generate-otp.dto"
import { IsNotEmpty } from "class-validator"

export class VerifyOTPDto extends PartialType(GenerateOTPDto) {
  @IsNotEmpty()
  readonly otp: string

  @IsNotEmpty()
  readonly hash: string

  readonly name?: string
}
