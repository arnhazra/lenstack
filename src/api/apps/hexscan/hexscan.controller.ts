import { Controller, Post } from "@nestjs/common"
import { HexscanService } from "./hexscan.service"
import { HttpService } from "@nestjs/axios"
import { lastValueFrom } from 'rxjs'

@Controller("hexscan")
export class HexscanController {
  constructor(private readonly hexscanService: HexscanService, private readonly httpService: HttpService) { }

  @Post("analyze")
  async create() {
    const response = await lastValueFrom(this.httpService.get("https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=0xC9bd090E7478422eA19cAeE5c9843ED4c1284DdF&apikey=E2IVVZYPQ3PZ2DM8K4BE948VNU5SG2NNXC"))
    return response.data
  }
}
