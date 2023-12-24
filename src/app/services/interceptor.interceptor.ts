import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, map, tap } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(
    private _loading: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // this._loading.show()
    // return next.handle(req).pipe(
    //   finalize(() => this._loading.hide())
    // );
    this._loading.show();
    return next.handle(req).pipe(
      tap(
        req => {
          if (req instanceof HttpResponse) {
            this._loading.hide();
          }
        },
        err => {
          this._loading.hide();
        }
      )
    );
  }
}
