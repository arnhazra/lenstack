export class UpdateCarbonSettingsCommand {
  constructor(
    public readonly id: string,
    public readonly reduceCarbonEmissions: boolean
  ) { }
}