export class CreateQueryCommand {
  constructor(
    public readonly workspaceId: string,
    public readonly prompt: string,
    public readonly response: string
  ) {}
}
