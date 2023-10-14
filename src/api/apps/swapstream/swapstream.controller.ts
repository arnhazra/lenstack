import { BadRequestException, Controller, Post } from "@nestjs/common"
import { SwapstreamService } from "./swapstream.service"

@Controller("swapstream")
export class SwapstreamController {
  constructor(private readonly swapstreamService: SwapstreamService) { }

  @Post("getswapstreamtokenconfig")
  getSwapStreamTokenList() {
    try {
      return this.swapstreamService.getSwapStreamTokenList()
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
