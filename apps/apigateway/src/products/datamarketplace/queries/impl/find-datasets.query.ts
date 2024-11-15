import { FindDatasetsDto } from "../../dto/find-datasets.dto"

export class FindDatasetsQuery {
  constructor(public readonly findDatasetsDto: FindDatasetsDto) {}
}
