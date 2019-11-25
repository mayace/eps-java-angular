import { Injectable } from '@angular/core';
import { finalize, catchError, tap } from "rxjs/operators";
import { MensajeService } from "./mensaje.service";

import {
    HttpErrorResponse,
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { BodyResponse } from './modelos';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(private mensajes: MensajeService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const self = this;
        self.mensajes.loading = true;
        return next.handle(req).pipe(
            finalize(() => self.mensajes.loading = false)
            , tap((event: HttpResponse<BodyResponse<any>>) => {
                const body = event && event.body;
                if (body) {
                    const err = body && body.error;
                    if (err) {
                        self.mensajes.create_danger(err && err.Message || err);
                    }
                }
            }, (event: HttpErrorResponse) => {
                self.mensajes.create_danger(event.message);
            })
        );
    }
}

