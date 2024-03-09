import { PartialType } from "@nestjs/mapped-types"

export class UpdateSustainabilityDto {
  readonly useEnergySaver: boolean
  readonly useOptimizedAPICalls: boolean
}
