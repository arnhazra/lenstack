import { Module } from "@nestjs/common"
import { AirlakeModule } from "./airlake/airlake.module"
import { FrostlakeModule } from "./frostlake/frostlake.module"
import { WealthnowModule } from "./wealthnow/wealthnow.module"

@Module({
  imports: [AirlakeModule, FrostlakeModule, WealthnowModule]
})
export class AppsModule { }
