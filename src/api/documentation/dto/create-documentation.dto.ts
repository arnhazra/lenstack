import { IsNotEmpty } from "class-validator"

export class CreateDocumentationDto {
  @IsNotEmpty()
  readonly productName: string

  @IsNotEmpty()
  readonly apiName: string

  @IsNotEmpty()
  readonly apiUri: string

  @IsNotEmpty()
  readonly apiMethod: string

  readonly sampleRequestBody: string

  readonly sampleResponseBody: string
}
