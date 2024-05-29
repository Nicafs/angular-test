import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ToastrService } from 'ngx-toastr';

import { MovieService } from '@services/movie';
import { TIntervalProcucer, TMovie, TStudio, TYearWinner } from '@models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  listYearsMultWinners: TYearWinner[] = [];
  top3StudiosWinners: TStudio[] = [];
  producersInterval: TIntervalProcucer = { min: [], max: [] };
  listMoviesWinnerByYear: TMovie[] = [];

  filterYear: string | undefined;

  columnsListYearsMultWinners: string[] = ['year', 'winnerCount'];
  columnsTop3StudiosWinners: string[] = ['name'];
  columnsProducersInterval: string[] = [
    'producer',
    'interval',
    'previousWin',
    'followingWin',
  ];
  columnsListMoviesWinnerByYear: string[] = ['id', 'year'];

  constructor(
    private _movieService: MovieService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this._movieService.getMovieYearsWithMultWinners().subscribe({
      next: (response) => {
        this.listYearsMultWinners = response.years;
      },
      error: (error) => {
        this.toastr.error('Error!', error.message);
      },
    });

    this._movieService.getStudios().subscribe({
      next: (response) => {
        const studios = response.studios;

        studios.sort((a, b) =>
          a.winCount > b.winCount ? -1 : b.winCount > a.winCount ? 1 : 0,
        );

        this.top3StudiosWinners = studios.slice(0, 3);
      },
      error: (error) => {
        this.toastr.error('Error!', error.message);
      },
    });

    this._movieService.getIntervalForProducers().subscribe({
      next: (response) => {
        this.producersInterval = response;
      },
      error: (error) => {
        this.toastr.error('Error!', error.message);
      },
    });
  }

  onChangeYear(event: any): void {
    const year = event.target.value || '';

    this._movieService.getMoviesPerYear(true, year).subscribe({
      next: (response) => {
        this.listMoviesWinnerByYear = response;
      },
      error: (error) => {
        this.toastr.error('Error!', error.message);
      },
    });
  }
}
