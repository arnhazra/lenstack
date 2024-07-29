export class CreateQueryCommand {
  constructor(
    public readonly orgId: string,
    public readonly prompt: string,
    public readonly response: string,
  ) { }
}