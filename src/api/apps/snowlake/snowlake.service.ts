import { Injectable } from "@nestjs/common"
import { CreateSnowlakeDto } from "./dto/create-snowlake.dto"
import { UpdateSnowlakeDto } from "./dto/update-snowlake.dto"

@Injectable()
export class SnowlakeService {
  create(createSnowlakeDto: CreateSnowlakeDto) {
    return "This action adds a new snowlake"
  }

  findAll() {
    return `This action returns all snowlake`
  }

  findOne(id: number) {
    return `This action returns a #${id} snowlake`
  }

  update(id: number, updateSnowlakeDto: UpdateSnowlakeDto) {
    return `This action updates a #${id} snowlake`
  }

  remove(id: number) {
    return `This action removes a #${id} snowlake`
  }
}
