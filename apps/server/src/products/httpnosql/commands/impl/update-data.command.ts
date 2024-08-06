export class UpdateDataCommand {
  constructor(
    public readonly orgId: string,
    public readonly key: string,
    public readonly value: string
  ) { }
}