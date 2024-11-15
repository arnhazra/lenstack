export class ReadValueByKeyQuery {
  constructor(
    public readonly workspaceId: string,
    public readonly key: string
  ) {}
}
