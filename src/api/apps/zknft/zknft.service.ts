import { Injectable } from "@nestjs/common"
import { CreateZknftDto } from "./dto/create-zknft.dto"
import { UpdateZknftDto } from "./dto/update-zknft.dto"

@Injectable()
export class ZknftService {
  create(createZknftDto: CreateZknftDto) {
    return "This action adds a new zknft"
  }

  findAll() {
    return `This action returns all zknft`
  }

  findOne(id: number) {
    return `This action returns a #${id} zknft`
  }

  update(id: number, updateZknftDto: UpdateZknftDto) {
    return `This action updates a #${id} zknft`
  }

  remove(id: number) {
    return `This action removes a #${id} zknft`
  }
}
