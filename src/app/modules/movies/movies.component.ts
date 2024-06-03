import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { ToastrService } from 'ngx-toastr';

import { MovieService } from '@services/movie';
import { TMovie } from '@models';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  listMovies = new MatTableDataSource<TMovie>([]);
  listMovies2: TMovie[] = [];

  filterYear: string | undefined;
  filterWinner: number = 0;

  columnsListMovies: string[] = ['id', 'year', 'title', 'winner'];

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [2, 5, 10, 25, 50, 100];

  constructor(
    private _movieService: MovieService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.getMovieData();
  }

  getMovieData(): void {
    let winner;

    if (this.filterWinner !== 0) {
      winner = this.filterWinner === 1 ? true : false;
    }

    this._movieService
      .getMovieData(
        this.pageIndex,
        this.pageSize,
        winner,
        this.filterYear || '',
      )
      .subscribe({
        next: (response) => {
          this.listMovies = new MatTableDataSource<TMovie>(response.content);
          this.length = response.totalElements;
        },
        error: (error) => {
          this.toastr.error('Error!', error.message);
        },
      });
  }

  onChangeYear(event: any): void {
    const year = event.target.value || '';

    this.filterYear = year;

    this.getMovieData();
  }

  onChangeWinner(event: any): void {
    const winner = event.value;
    this.filterWinner = winner;

    this.getMovieData();
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.getMovieData();
  }
}
