import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from '@env/environment';
import { TIntervalProcucer, TMovie, TStudio, TYearWinner } from '@models';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private _http: HttpClient) {}

  getMovieData(
    page = 0,
    size = 10,
    winner: boolean | undefined,
    year: string | undefined,
  ): Observable<any> {
    return this._http.get<any>(
      `${environment.api}/movies?page=${page}&size=${size}${winner !== undefined ? `&winner=${winner}` : ''}${year !== undefined ? `&year=${year}` : ''}`,
    );
  }

  getMovieYearsWithMultWinners(): Observable<{ years: TYearWinner[] }> {
    return this._http.get<{ years: TYearWinner[] }>(
      `${environment.api}/movies?projection=years-with-multiple-winners`,
    );
  }

  getStudios(): Observable<{ studios: TStudio[] }> {
    return this._http.get<{ studios: TStudio[] }>(
      `${environment.api}/movies?projection=studios-with-win-count`,
    );
  }

  getIntervalForProducers(): Observable<TIntervalProcucer> {
    return this._http.get<TIntervalProcucer>(
      `${environment.api}/movies?projection=max-min-win-interval-for-producers`,
    );
  }

  getMoviesPerYear(winner: boolean, year: string): Observable<TMovie[]> {
    return this._http.get<TMovie[]>(
      `${environment.api}/movies?winner=${winner}&year=${year}`,
    );
  }
}
