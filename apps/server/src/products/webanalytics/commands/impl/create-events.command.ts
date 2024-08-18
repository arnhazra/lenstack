import { CreateEventsDto } from "../../dto/create-events.dto"

export class CreateEventsCommand {
  constructor(
    public readonly orgId: string,
    public readonly createEventsDto: CreateEventsDto
  ) { }
}