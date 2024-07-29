import { IsNotEmpty } from "class-validator"

export class CreateEventsDto {
  @IsNotEmpty()
  component: string

  @IsNotEmpty()
  event: string

  @IsNotEmpty()
  info: string

  @IsNotEmpty()
  statusCode: string
}