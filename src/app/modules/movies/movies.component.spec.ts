import {
  ComponentFixture,
  TestBed,
  inject,
  waitForAsync,
} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MoviesComponent } from './movies.component';
import { MovieService } from '@app/core/services/movie/movie.service';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let service: MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesComponent, HttpClientModule, BrowserAnimationsModule],
    }).compileComponents();

    service = TestBed.inject(MovieService);
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on change year', () => {
    component.onChangeYear({ target: { value: 2000 } });
    fixture.detectChanges();
  });

  it('should use the service', () => {
    const fakedFetchedList = [
      {
        id: 107,
        year: 2000,
        title: 'Book of Shadows: Blair Witch 2',
        studios: ['Artisan Entertainment'],
        producers: ['Bill Carraro'],
        winner: false,
      },
      {
        id: 108,
        year: 2000,
        title: 'The Flintstones in Viva Rock Vegas',
        studios: ['Universal Studios'],
        producers: ['Bruce Cohen'],
        winner: false,
      },
      {
        id: 109,
        year: 2000,
        title: 'Little Nicky',
        studios: ['New Line Cinema'],
        producers: ['Jack Giarraputo', 'Robert Simonds'],
        winner: false,
      },
      {
        id: 110,
        year: 2000,
        title: 'The Next Best Thing',
        studios: ['Paramount Pictures'],
        producers: ['Leslie Dixon', 'Linne Radmin', 'Tom Rosenberg'],
        winner: false,
      },
    ];

    waitForAsync(
      inject([MovieService], (service: any) =>
        service
          .getMoviesPerYear(false, 2000)
          .subscribe((result: any) => expect(result).toBe(fakedFetchedList)),
      ),
    );
  });
});
