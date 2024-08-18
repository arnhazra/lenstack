import { IsNotEmpty } from "class-validator"

export class CreateEventsDto {
  @IsNotEmpty()
  event: Record<string, any> | Record<string, any>[] | string | string[]
}