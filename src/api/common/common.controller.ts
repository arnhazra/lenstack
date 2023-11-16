import { Controller, Post } from "@nestjs/common"
import { CommonService } from "./common.service"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"

@Controller("common")
export class CommonController {
  constructor(private readonly commonService: CommonService) { }

  @Post("getsecretconfig")
  getSecretConfig(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      return this.commonService.getSecretConfig()
    }

    catch (error) {
      throw error
    }
  }
}
