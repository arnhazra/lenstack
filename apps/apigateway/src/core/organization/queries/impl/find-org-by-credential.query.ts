export class FindOrgByCredentialQuery {
  constructor(
    public readonly clientId: string,
    public readonly clientSecret: string
  ) {}
}
