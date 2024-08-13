import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { ModRequest } from "./types/mod-request.interface"

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: ModRequest = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()

    return next.handle().pipe(
      map((data) => {
        if (request.newAccessToken) {
          if (typeof data === 'object' && data !== null) {
            data['newAccessToken'] = request.newAccessToken
          } else {
            data = { data, newAccessToken: request.newAccessToken }
          }
        }
        return data
      })
    )
  }
}
