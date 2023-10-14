import { PartialType } from "@nestjs/mapped-types"
import { CreateCruxqlDto } from "./create-cruxql.dto"

export class UpdateCruxqlDto extends PartialType(CreateCruxqlDto) { }
