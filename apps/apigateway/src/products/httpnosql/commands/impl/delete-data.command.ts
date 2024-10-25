export class DeleteDataCommand {
  constructor(
    public readonly orgId: string,
    public readonly key: string
  ) {}
}
