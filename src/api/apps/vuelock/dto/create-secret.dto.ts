import { IsNotEmpty } from "class-validator"

export class CreateSecretDto {
  @IsNotEmpty()
  key: string

  @IsNotEmpty()
  secretValue: string

  @IsNotEmpty()
  apiKey: string

  @IsNotEmpty()
  vaultId: string

  @IsNotEmpty()
  vaultSecret: string
}