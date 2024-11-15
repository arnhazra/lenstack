import { CreateActivityDto } from "../../dto/create-activity.dto"

export class CreateActivityCommand {
  constructor(public readonly createActivityDto: CreateActivityDto) {}
}
