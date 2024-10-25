export class UpdateOrganizationCommand {
  constructor(public readonly userId: string, public readonly orgId: string) {}
}
