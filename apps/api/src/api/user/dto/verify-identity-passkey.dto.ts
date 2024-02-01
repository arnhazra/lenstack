import { PartialType } from "@nestjs/mapped-types"
import { GenerateIdentityPasskeyDto } from "./generate-identity-passkey.dto"
import { IsNotEmpty } from "class-validator"

export class VerifyIdentityPasskeyDto extends PartialType(GenerateIdentityPasskeyDto) {
  @IsNotEmpty()
  readonly passKey: string

  @IsNotEmpty()
  readonly hash: string
}
