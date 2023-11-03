import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { DocumentationService } from "./documentation.service"
import { CreateDocumentationDto } from "./dto/create-documentation.dto"
import { TokenAuthorizer } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"

@Controller("documentation")
export class DocumentationController {
  constructor(private readonly documentationService: DocumentationService) { }

  @Post("create")
  async createDocumentation(@Body() createDocumentationDto: CreateDocumentationDto) {
    try {
      await this.documentationService.createDocumentation(createDocumentationDto)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }

  }

  @Post("getallbyappname")
  async getDocumentationByAppName(@TokenAuthorizer() userId: string, @Body("appName") appName: string) {
    try {
      const docList = await this.documentationService.getDocumentationByAppName(appName)
      return { docList }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
