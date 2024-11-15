import { CreateEventsDto } from "../../dto/create-events.dto"

export class CreateEventsCommand {
  constructor(
    public readonly workspaceId: string,
    public readonly createEventsDto: CreateEventsDto
  ) {}
}
