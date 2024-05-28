import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { switchMap, filter, take } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@core/authentication';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // Flag "semáforo" para verificar se o token está em processo de refresh
  private isRefreshing = false;

  // Utilizado para salvar o token "refreshado" de imediato e emitir
  // para as requisições que estavam no aguardo do refresh de token
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null,
  );

  constructor(private jwtHelperService: JwtHelperService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // Para prosseguir rotas que já foram informadas o authorization
    if (request.headers.get('authorization')) {
      return next.handle(request);
    }

    // Para prosseguir rotas que não devem ter token
    if (request.headers.get('NoToken')) {
      request.headers.delete('NoToken');
      return next.handle(request);
    }

    const token = this.jwtHelperService.getToken();
    if (token && !this.jwtHelperService.isTokenExpired(token)) {
      const exp = this.jwtHelperService.getTokenExpiration(token) - 300;
      const now = Math.floor(Date.now() / 1000); // Pega o timestamp referente ao momento agora

      // Verifica se o momento de expiração (-5 min) é maior que o momento atual.
      if (exp > now) {
        request = this.addToken(request, token);
      } else {
        request = this.addToken(request, token);
        this.handleRefreshToken(request, next); // Se está próximo a expirar, hora de executar o refresh
      }
    }

    return next.handle(request);
  }

  // Retorna um clone da requisição com o token adicionado ao header
  private addToken(request: HttpRequest<any>, token: string) {
    const content = request.headers.get('Content-Type')
      ? request.headers.get('Content-Type')
      : 'application/json';

    if (content !== 'none') {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': content,
        },
      });
    }

    return request.clone({
      headers: request.headers.delete('Content-Type', 'none'),
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Efetua o refresh do token
  private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.jwtHelperService.refreshToken().subscribe((token) => {
        this.isRefreshing = false;
        this.refreshTokenSubject.next(token);
        return next.handle(request);
      });
    }

    return this.refreshTokenSubject
      .pipe(
        filter((token) => token != null),
        take(1),
        switchMap((newToken) => {
          // Next passando a requisição com o novo token gerado
          return next.handle(this.addToken(request, newToken));
        }),
      )
      .subscribe(); // Fim Senão
  } // Fim handleRefresh
} // Fim TokenInterceptor
