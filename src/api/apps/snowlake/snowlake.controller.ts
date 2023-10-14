import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common"
import { SnowlakeService } from "./snowlake.service"
import { CreateSnowlakeDto } from "./dto/create-snowlake.dto"
import { UpdateSnowlakeDto } from "./dto/update-snowlake.dto"

@Controller("snowlake")
export class SnowlakeController {
  constructor(private readonly snowlakeService: SnowlakeService) { }

  @Post()
  create(@Body() createSnowlakeDto: CreateSnowlakeDto) {
    return this.snowlakeService.create(createSnowlakeDto)
  }

  @Get()
  findAll() {
    return this.snowlakeService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.snowlakeService.findOne(+id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSnowlakeDto: UpdateSnowlakeDto) {
    return this.snowlakeService.update(+id, updateSnowlakeDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.snowlakeService.remove(+id)
  }
}
