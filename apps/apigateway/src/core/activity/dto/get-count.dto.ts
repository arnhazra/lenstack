import { IsNotEmpty } from "class-validator"

export class GetCountDto {
  @IsNotEmpty()
  searchKeyword: string
}
