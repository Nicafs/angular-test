import {
  ComponentFixture,
  TestBed,
  inject,
  waitForAsync,
} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MovieService } from '@app/core/services/movie/movie.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: MovieService;
  let mockService;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj([
      'getMovieYearsWithMultWinners',
      'getStudios',
      'getIntervalForProducers',
      'getMoviesPerYear',
    ]);

    mockService.getMovieYearsWithMultWinners.and.returnValue({
      years: [
        {
          year: 1986,
          winnerCount: 2,
        },
        {
          year: 1990,
          winnerCount: 2,
        },
        {
          year: 2015,
          winnerCount: 2,
        },
      ],
    });

    mockService.getStudios.and.returnValue({
      studios: [
        {
          name: 'Columbia Pictures',
          winCount: 7,
        },
        {
          name: 'Paramount Pictures',
          winCount: 6,
        },
        {
          name: 'Warner Bros.',
          winCount: 5,
        },
        {
          name: '20th Century Fox',
          winCount: 4,
        },
        {
          name: 'MGM',
          winCount: 3,
        },
        {
          name: 'Universal Studios',
          winCount: 2,
        },
        {
          name: 'Universal Pictures',
          winCount: 2,
        },
        {
          name: 'Hollywood Pictures',
          winCount: 2,
        },
        {
          name: 'Nickelodeon Movies',
          winCount: 1,
        },
        {
          name: 'C2 Pictures',
          winCount: 1,
        },
        {
          name: 'Summit Entertainment',
          winCount: 1,
        },
        {
          name: 'Hasbro',
          winCount: 1,
        },
        {
          name: 'Associated Film Distribution',
          winCount: 1,
        },
        {
          name: 'Revolution Studios',
          winCount: 1,
        },
        {
          name: 'First Look Pictures',
          winCount: 1,
        },
        {
          name: 'Focus Features',
          winCount: 1,
        },
        {
          name: 'Cannon Films',
          winCount: 1,
        },
        {
          name: 'United Artists',
          winCount: 1,
        },
        {
          name: 'Touchstone Pictures',
          winCount: 1,
        },
        {
          name: 'Samuel Goldwyn Films',
          winCount: 1,
        },
        {
          name: 'Quality Flix',
          winCount: 1,
        },
        {
          name: 'TriStar Pictures',
          winCount: 1,
        },
        {
          name: 'Franchise Pictures',
          winCount: 1,
        },
        {
          name: 'Relativity Media',
          winCount: 1,
        },
        {
          name: 'Castle Rock Entertainment',
          winCount: 1,
        },
        {
          name: 'Screen Gems',
          winCount: 1,
        },
        {
          name: 'Triumph Releasing',
          winCount: 1,
        },
        {
          name: 'DreamWorks',
          winCount: 1,
        },
      ],
    });

    mockService.getIntervalForProducers.and.returnValue({
      min: [
        {
          producer: 'Joel Silver',
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
      max: [
        {
          producer: 'Matthew Vaughn',
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
    });

    mockService.getMoviesPerYear.and.returnValue([
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
    ]);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, HttpClientModule, BrowserAnimationsModule],
    }).compileComponents();

    service = TestBed.inject(MovieService);
    fixture = TestBed.createComponent(DashboardComponent);
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

  it('should use the service on change', () => {
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
