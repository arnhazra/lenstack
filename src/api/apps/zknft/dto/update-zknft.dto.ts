import { PartialType } from "@nestjs/mapped-types"
import { CreateZknftDto } from "./create-zknft.dto"

export class UpdateZknftDto extends PartialType(CreateZknftDto) { }
