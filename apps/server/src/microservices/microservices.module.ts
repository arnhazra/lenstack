import { Module } from '@nestjs/common';
import { EmailModule } from "./email/email.module";
import { TokenModule } from "./token/token.module";

@Module({
  imports: [
    EmailModule,
    TokenModule
  ]
})
export class MicroservicesModule { }
