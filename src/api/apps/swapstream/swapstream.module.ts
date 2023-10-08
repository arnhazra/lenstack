import { Module } from '@nestjs/common';
import { SwapstreamService } from './swapstream.service';
import { SwapstreamController } from './swapstream.controller';

@Module({
  controllers: [SwapstreamController],
  providers: [SwapstreamService],
})
export class SwapstreamModule {}
