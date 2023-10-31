import { Module } from "@nestjs/common"
import { AirlakeModule } from "./airlake/airlake.module"
import { FrostlakeModule } from "./frostlake/frostlake.module"
import { SwapstreamModule } from "./swapstream/swapstream.module"
import { DwalletModule } from "./dwallet/dwallet.module"
import { SnowlakeModule } from "./snowlake/snowlake.module"
import { EasenftModule } from "./easenft/easenft.module"
import { VuelockModule } from "./vuelock/vuelock.module"

@Module({
  imports: [AirlakeModule, FrostlakeModule, SwapstreamModule, DwalletModule, SnowlakeModule, EasenftModule, VuelockModule]
})
export class AppsModule { }
