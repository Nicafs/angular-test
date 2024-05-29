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
    return this._http.get<any>(
      `${environment.api}/movies?page=${page}&size=${size}&winner=${winner}&year=${year}`,
    );
  }

  getMovieYearsWithMultWinners(): Observable<any> {
    return this._http.get<any>(
      `${environment.api}/movies?projection=years-with-multiple-winners`,
    );
  }

  getStudios(): Observable<any> {
    return this._http.get<any>(
      `${environment.api}/movies?projection=studios-with-win-count`,
    );
  }

  getIntervalForProducers(): Observable<any> {
    return this._http.get<any>(
      `${environment.api}/movies?projection=max-min-win-interval-for-producers`,
    );
  }

  getMoviesPerYear(winner: boolean, year: string): Observable<any> {
    return this._http.get<any>(
      `${environment.api}/movies?winner=${winner}&year=${year}`,
    );
  }
}
