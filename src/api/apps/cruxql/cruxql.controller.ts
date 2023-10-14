import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common"
import { CruxqlService } from "./cruxql.service"
import { CreateCruxqlDto } from "./dto/create-cruxql.dto"
import { UpdateCruxqlDto } from "./dto/update-cruxql.dto"

@Controller("cruxql")
export class CruxqlController {
  constructor(private readonly cruxqlService: CruxqlService) { }

  @Post()
  create(@Body() createCruxqlDto: CreateCruxqlDto) {
    return this.cruxqlService.create(createCruxqlDto)
  }

  @Get()
  findAll() {
    return this.cruxqlService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cruxqlService.findOne(+id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCruxqlDto: UpdateCruxqlDto) {
    return this.cruxqlService.update(+id, updateCruxqlDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cruxqlService.remove(+id)
  }
}
