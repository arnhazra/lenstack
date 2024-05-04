import { Module } from "@nestjs/common"
import { DatamarketplaceService } from "./datamarketplace.service"
import { DatamarketplaceController } from "./datamarketplace.controller"

@Module({
  controllers: [DatamarketplaceController],
  providers: [DatamarketplaceService],
})
export class DatamarketplaceModule { }
