export class UpdateWorkspaceCommand {
  constructor(
    public readonly userId: string,
    public readonly workspaceId: string
  ) {}
}
