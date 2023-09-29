import { PartialType } from '@nestjs/mapped-types'
import { RequestAuthCodeDto } from './request-auth-code.dto'

export class VerifyAuthCodeDto extends PartialType(RequestAuthCodeDto) {
    readonly authCode: string
    readonly hash: string
    readonly privateKey: string
}
