import { PartialType } from "@nestjs/mapped-types"
import { GenerateAuthPasskeyDto } from "./generate-auth-passkey.dto"
import { IsNotEmpty } from "class-validator"

export class VerifyAuthPasskeyDto extends PartialType(GenerateAuthPasskeyDto) {
  @IsNotEmpty()
  readonly passKey: string

  @IsNotEmpty()
  readonly hash: string

  readonly name?: string
}
