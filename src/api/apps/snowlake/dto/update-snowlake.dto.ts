import { PartialType } from "@nestjs/mapped-types"
import { CreateSnowlakeDto } from "./create-snowlake.dto"

export class UpdateSnowlakeDto extends PartialType(CreateSnowlakeDto) { }
