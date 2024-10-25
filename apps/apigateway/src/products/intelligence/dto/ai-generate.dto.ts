import { IsNotEmpty } from "class-validator"

export class AIGenerationDto {
	@IsNotEmpty()
	prompt: string

	@IsNotEmpty()
	temperature: number

	@IsNotEmpty()
	topP: number

	@IsNotEmpty()
	topK: number
}
