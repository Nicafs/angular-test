import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../core/services/movie';
import {
  TIntervalProcucer,
  TMovie,
  TStudio,
  TYearWinner,
} from '../../share/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  listYearsMultWinners: TYearWinner[] = [];
  top3StudiosWinners: TStudio[] = [];
  producersInterval: TIntervalProcucer[] = [];
  listMoviesWinnerByYear: TMovie[] = [];

  displayedColumns: string[] = ['year', 'winnerCount'];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovieYearsWithMultWinners('1999').subscribe({
      next: (response) => {
        console.log('response:', response);
      },
      error: (error) => {
        console.log('error:', error);
      },
    });

    this.movieService.getStudios('1999').subscribe({
      next: (response) => {
        console.log('response:', response);
      },
      error: (error) => {
        console.log('error:', error);
      },
    });

    this.movieService.getIntervalForProducers('1999').subscribe({
      next: (response) => {
        console.log('response:', response);
      },
      error: (error) => {
        console.log('error:', error);
      },
    });

    this.movieService.getMoviesPerYear(true, '1999').subscribe({
      next: (response) => {
        console.log('response:', response);
      },
      error: (error) => {
        console.log('error:', error);
      },
    });
  }
}
