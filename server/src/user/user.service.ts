import { Injectable } from '@nestjs/common'
import { RequestAuthCodeDto } from './dto/request-auth-code.dto'

@Injectable()
export class UserService {
  requestAuthCode(requestAuthCodeDto: RequestAuthCodeDto) {
    const { email } = requestAuthCodeDto
    return email
  }

  verifyAuthCode() {
    return `This action returns all user`
  }

  getUserDetails() {
    return `This action returns  user`
  }

  signOut() {
    return `This action updates a  user`
  }
}
