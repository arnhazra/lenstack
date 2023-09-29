import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, 'client'),
		}),
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
