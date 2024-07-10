import BaseEventEmitter from "events"
import { EventUnion } from "./eventUnion"

type Listener<T> = T extends (...args: infer P) => any ? (...args: P) => void : never

class EventEmitter<Events extends Record<string, (...args: any[]) => any>> extends BaseEventEmitter {
  emitEvent<Event extends keyof Events>(event: Event, ...args: Parameters<Events[Event]>): boolean {
    return super.emit(event as string, ...args)
  }

  onEvent<Event extends keyof Events>(event: Event, listener: Listener<Events[Event]>): this {
    return super.on(event as string, listener as (...args: any[]) => void)
  }

  offEvent<Event extends keyof Events>(event: Event, listener: Listener<Events[Event]>): this {
    return super.off(event as string, listener as (...args: any[]) => void)
  }
}

const eventEmitter = new EventEmitter<EventUnion>()
export default eventEmitter