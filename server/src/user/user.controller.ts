import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { RequestAuthCodeDto } from './dto/request-auth-code.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/requestauthcode')
  requestAuthCode(@Body() requestAuthCodeDto: RequestAuthCodeDto) {
    return this.userService.requestAuthCode(requestAuthCodeDto)
  }

  @Post('/verifyauthcode')
  verifyAuthCode(@Body() createUserDto: RequestAuthCodeDto) {
    return this.userService.verifyAuthCode()
  }

  @Post('/userdetails')
  userDetails(@Body() createUserDto: RequestAuthCodeDto) {
    return this.userService.getUserDetails()
  }

  @Post('/signout')
  signOut() {
    return this.userService.signOut()
  }
}
