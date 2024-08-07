export enum AttributeNames {
  ReduceCarbonEmissions = "reduceCarbonEmissions",
  SelectedOrgId = "selectedOrgId",
  UsageInsights = "usageInsights",
}

export class UpdateAttributeCommand {
  constructor(
    public readonly userId: string,
    public readonly attributeName: AttributeNames,
    public readonly attributeValue: string
  ) { }
}