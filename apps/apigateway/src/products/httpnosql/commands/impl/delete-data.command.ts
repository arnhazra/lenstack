export class DeleteDataCommand {
  constructor(
    public readonly workspaceId: string,
    public readonly key: string
  ) {}
}
