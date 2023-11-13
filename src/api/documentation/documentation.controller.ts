import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { DocumentationService } from "./documentation.service"
import { CreateDocumentationDto } from "./dto/create-documentation.dto"
import { TokenAuthorizer, TokenAuthorizerReturnType } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"

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

  @Post("getallbyproductname")
  async getDocumentationByProductName(@TokenAuthorizer() uft: TokenAuthorizerReturnType, @Body("productName") productName: string) {
    try {
      const docList = await this.documentationService.getDocumentationByProductName(productName)
      return { docList }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
