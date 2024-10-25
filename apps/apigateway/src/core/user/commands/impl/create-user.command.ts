export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly walletBalance: number
  ) {}
}
