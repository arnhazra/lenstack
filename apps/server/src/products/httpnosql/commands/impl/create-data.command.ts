export class CreateDataCommand {
  constructor(
    public readonly orgId: string,
    public readonly key: string,
    public readonly value: Record<string, any> | Record<string, any>[] | string | string[]
  ) { }
}