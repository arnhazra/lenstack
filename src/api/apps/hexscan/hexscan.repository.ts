import { Injectable } from "@nestjs/common"
import { HexscanTransactionModel } from "./entities/hexscan.entity"

@Injectable()
export class HexscanRepository {
  async createNewTransaction(workspaceId: string) {
    const tx = await new HexscanTransactionModel({ workspaceId }).save()
    return tx
  }
}
