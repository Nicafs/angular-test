import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private _http: HttpClient) {}

  getMovieData(
    page = 0,
    size = 8,
    winner = true,
    year: string,
  ): Observable<any> {
    return this._http
      .get<any>(
        `${environment.api}/movies?page=${page}&size=${size}&winner=${winner}&year=${year}`,
      )
      .pipe(map((result) => result.content));
  }

  getMovieYearsWithMultWinners(years: string): Observable<any> {
    return this._http
      .get<any>(`${environment.api}/movies?projection=${years}`)
      .pipe(map((result) => result.content));
  }

  getStudios(studios: string): Observable<any> {
    return this._http
      .get<any>(`${environment.api}/movies?projection=${studios}`)
      .pipe(map((result) => result.content));
  }

  getIntervalForProducers(interval: string): Observable<any> {
    return this._http
      .get<any>(`${environment.api}/movies?projection=${interval}`)
      .pipe(map((result) => result.content));
  }

  getMoviesPerYear(winner: boolean, year: string): Observable<any> {
    return this._http
      .get<any>(`${environment.api}/movies?winner=${winner}&year=${year}`)
      .pipe(map((result) => result.content));
  }
}
