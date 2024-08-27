import { Module } from '@nestjs/common';
import { TokenModule } from "./token/token.module";

@Module({
  imports: [
    TokenModule
  ]
})
export class MicroservicesModule { }
