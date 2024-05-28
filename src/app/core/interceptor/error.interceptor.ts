/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { LoaderService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private requests: HttpRequest<unknown>[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private loaderService: LoaderService,
  ) {}

  removeRequest(req: HttpRequest<unknown>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this.requests.push(request);

    this.loaderService.isLoading.next(true);
    return Observable.create((observer) => {
      const subscription = next
        .handle(request)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              switch (error.status) {
                case 400: // Bad Request
                  errorMessage = 'Houve um erro na requisição da Informação';
                  break;

                case 401: // Unauthorized
                  errorMessage =
                    'Usuário não tem autorização para realizar tal Operação!!';
                  break;

                case 403: // Forbidden
                  errorMessage = 'Usuário não possui acesso';
                  break;

                case 404: // Not Found
                  errorMessage = 'Não foi encontrado a requisição';
                  break;

                case 405: // Method Not Allowed
                  errorMessage = 'Houve um erro na requisição da Informação';
                  break;

                case 408: // Request Timeout
                  errorMessage = 'Requisição Expirou o Tempo. Tente novamente.';
                  break;
                default:
                  errorMessage =
                    'Houve um erro desconhecido na Requisição. Tenta novamente ou entre em contato com o suporte.';
              }
            }

            if (environment.production === false) {
              console.group('-=ERROR INTERCEPTOR=-');
              console.log(
                `Error Status: ${error.status}\nMessage: ${error.message}`,
              );
              console.groupEnd();
            }

            this.toastr.error(errorMessage);

            return throwError(errorMessage);
          }),
        )
        .subscribe(
          (event) => {
            if (event instanceof HttpResponse) {
              this.removeRequest(request);
              observer.next(event);
            }
          },
          (err) => {
            this.removeRequest(request);
            observer.error(err);
          },
          () => {
            this.removeRequest(request);
            observer.complete();
          },
        );

      // remove request from queue when cancelled
      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      };
    });
  }
}
