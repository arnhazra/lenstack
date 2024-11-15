import { GetCountDto } from "../../dto/get-count.dto"

export class GetActivityQuery {
  constructor(public readonly getCountDto: GetCountDto) {}
}
