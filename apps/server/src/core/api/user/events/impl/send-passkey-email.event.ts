export class SendPasskeyEvent {
  constructor(
    public readonly receiverEmail: string,
    public readonly subject: string,
    public readonly body: string
  ) { }
}