// 拦截器：给所有请求加上 token
import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = window.sessionStorage.getItem('_token');

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const regx = !new RegExp('/login', 'gi').test(req.url)
      && !new RegExp('/register', 'gi').test(req.url);
    if (regx) {
      const authReq = req.clone({
        headers: req.headers.set('Token', authToken)
      });

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
