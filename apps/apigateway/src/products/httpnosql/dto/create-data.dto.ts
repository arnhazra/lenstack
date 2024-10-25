import { IsNotEmpty } from "class-validator"

export class CreateDataDto {
	@IsNotEmpty()
	key: string

	@IsNotEmpty()
	value: Record<string, any> | Record<string, any>[] | string | string[]
}
