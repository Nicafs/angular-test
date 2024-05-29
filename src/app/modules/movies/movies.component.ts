import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MovieService } from '../../core/services/movie';

import { TMovie } from '../../share/models';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  listMovies: TMovie[] = [];

  columnsListYearsMultWinners: string[] = ['year', 'winnerCount'];

  constructor(private _movieService: MovieService) {}

  ngOnInit(): void {
    this._movieService.getMovieYearsWithMultWinners().subscribe({
      next: (response) => {
        this.listMovies = response.years;
      },
      error: (error) => {
        console.log('error:', error);
      },
    });
  }
}
