import { Injectable } from "@nestjs/common"
import { CreateCruxqlDto } from "./dto/create-cruxql.dto"
import { UpdateCruxqlDto } from "./dto/update-cruxql.dto"

@Injectable()
export class CruxqlService {
  create(createCruxqlDto: CreateCruxqlDto) {
    return "This action adds a new cruxql"
  }

  findAll() {
    return `This action returns all cruxql`
  }

  findOne(id: number) {
    return `This action returns a #${id} cruxql`
  }

  update(id: number, updateCruxqlDto: UpdateCruxqlDto) {
    return `This action updates a #${id} cruxql`
  }

  remove(id: number) {
    return `This action removes a #${id} cruxql`
  }
}
