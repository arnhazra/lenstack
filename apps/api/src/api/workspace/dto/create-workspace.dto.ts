import { IsNotEmpty } from "class-validator"

export class CreateWorkspaceDto {
  @IsNotEmpty()
  readonly name: string
}
