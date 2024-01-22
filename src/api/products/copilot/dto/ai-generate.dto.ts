import { IsNotEmpty } from "class-validator"

export class AIGenerationDto {
  @IsNotEmpty()
  prompt: string
}
