import { Injectable } from "@nestjs/common"
import { HexscanTransactionModel } from "./entities/hexscan.entity"

@Injectable()
export class HexscanRepository {
  async createNewTransaction(userId: string) {
    const tx = await new HexscanTransactionModel({ owner: userId }).save()
    return tx
  }
}
