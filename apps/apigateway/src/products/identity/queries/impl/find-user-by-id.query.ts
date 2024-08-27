export class FindUserByIdQuery {
  constructor(
    public readonly userId: string,
    public readonly orgId: string
  ) { }
}