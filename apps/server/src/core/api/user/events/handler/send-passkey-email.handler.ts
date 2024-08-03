import { EventsHandler, IEventHandler } from "@nestjs/cqrs"
import { SendPasskeyEvent } from "../impl/send-passkey-email.event"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/core/events/events.union"

@EventsHandler(SendPasskeyEvent)
export class SendPasskeyEventHandler implements IEventHandler<SendPasskeyEvent> {
  constructor(private readonly eventEmitter: EventEmitter2) { }

  async handle(event: SendPasskeyEvent): Promise<void> {
    const { receiverEmail, subject, body } = event
    await this.eventEmitter.emitAsync(EventsUnion.SendEmail, { receiverEmail, subject, body })
  }
}