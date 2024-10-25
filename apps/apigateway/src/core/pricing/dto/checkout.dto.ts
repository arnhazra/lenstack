import { IsNotEmpty } from "class-validator"

export class CreateCheckoutSessionDto {
	@IsNotEmpty()
	readonly amount: number
}
