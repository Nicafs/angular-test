import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private _http: HttpClient) {}

  getProcurados(size = 8, page = 0): Observable<any> {
    return this._http
      .get<any>(
        `${environment.api}/v1/busca/alvos/alertasUnidades?size=${size}&page=${page}`
      )
      .pipe(map((result) => result.content));
  }
}
