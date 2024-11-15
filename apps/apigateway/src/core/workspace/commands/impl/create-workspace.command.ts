export class CreateWorkspaceCommand {
  constructor(
    public readonly name: string,
    public readonly userId: string
  ) {}
}
