export enum AttributeNames {
  ReduceCarbonEmissions = "reduceCarbonEmissions",
  SelectedOrgId = "selectedOrgId",
  ActivityLog = "activityLog",
  HasTrial = "hasTrial",
  Name = "name",
}

export class UpdateAttributeCommand {
  constructor(
    public readonly userId: string,
    public readonly attributeName: AttributeNames,
    public readonly attributeValue: string
  ) {}
}
