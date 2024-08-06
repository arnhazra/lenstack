export class UpdateUsageInsightsSettingsCommand {
  constructor(
    public readonly id: string,
    public readonly usageInsights: boolean
  ) { }
}