export class UpdateSelectedOrgCommand {
  constructor(
    public readonly id: string,
    public readonly orgId: string
  ) { }
}