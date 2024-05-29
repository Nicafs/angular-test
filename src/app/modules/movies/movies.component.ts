import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

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
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements AfterViewInit {
  listMovies = new MatTableDataSource<TMovie>([]);
  listMovies2: TMovie[] = [];

  filterYear: string | undefined;

  columnsListMovies: string[] = ['id', 'year', 'title'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private _movieService: MovieService,
    private toastr: ToastrService,
  ) {}

  ngAfterViewInit() {
    this.listMovies.paginator = this.paginator;
  }

  onChangeYear(event: any): void {
    const year = event.target.value || '';

    this._movieService.getMoviesPerYear(false, year).subscribe({
      next: (response) => {
        this.listMovies2 = response;
        this.listMovies = new MatTableDataSource<TMovie>(response);
        this.listMovies.paginator = this.paginator;
      },
      error: (error) => {
        this.toastr.error('Error!', error.message);
      },
    });
  }
}
