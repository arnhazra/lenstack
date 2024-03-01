import { Module } from "@nestjs/common"
import { KvstoreService } from "./kvstore.service"
import { KvstoreController } from "./kvstore.controller"

@Module({
  controllers: [KvstoreController],
  providers: [KvstoreService],
})
export class KvstoreModule { }
