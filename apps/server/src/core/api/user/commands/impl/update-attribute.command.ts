export enum AttributeNames {
  ReduceCarbonEmissions = "reduceCarbonEmissions",
  SelectedOrgId = "selectedOrgId",
  ActivityLog = "activityLog",
}

export class UpdateAttributeCommand {
  constructor(
    public readonly userId: string,
    public readonly attributeName: AttributeNames,
    public readonly attributeValue: string
  ) { }
}