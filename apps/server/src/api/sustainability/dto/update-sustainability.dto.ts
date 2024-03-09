import { PartialType } from "@nestjs/mapped-types"

export class UpdateSustainabilityDto {
  readonly useLessEnergy: boolean
  readonly useOptimizedAPICalls: boolean
  readonly useDarkMode: boolean
  readonly useFastestNode: boolean
}
