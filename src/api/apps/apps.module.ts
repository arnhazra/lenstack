import { Module } from "@nestjs/common"
import { AirlakeModule } from "./airlake/airlake.module"
import { FrostlakeModule } from "./frostlake/frostlake.module"
import { WealthnowModule } from "./wealthnow/wealthnow.module"
import { SwapstreamModule } from './swapstream/swapstream.module';

@Module({
  imports: [AirlakeModule, FrostlakeModule, WealthnowModule, SwapstreamModule]
})
export class AppsModule { }
