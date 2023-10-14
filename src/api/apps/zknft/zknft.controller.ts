import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common"
import { ZknftService } from "./zknft.service"
import { CreateZknftDto } from "./dto/create-zknft.dto"
import { UpdateZknftDto } from "./dto/update-zknft.dto"

@Controller("zknft")
export class ZknftController {
  constructor(private readonly zknftService: ZknftService) { }

  @Post()
  create(@Body() createZknftDto: CreateZknftDto) {
    return this.zknftService.create(createZknftDto)
  }

  @Get()
  findAll() {
    return this.zknftService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.zknftService.findOne(+id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateZknftDto: UpdateZknftDto) {
    return this.zknftService.update(+id, updateZknftDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.zknftService.remove(+id)
  }
}
