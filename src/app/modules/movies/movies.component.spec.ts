import {
  ComponentFixture,
  TestBed,
  async,
  inject,
  waitForAsync,
} from '@angular/core/testing';
import { MovieService } from '@app/core/services/movie/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrService, ToastrModule, provideToastr } from 'ngx-toastr';

import { MoviesComponent } from './movies.component';
import { By } from '@angular/platform-browser';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let service: MovieService;
  let toast: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MoviesComponent,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule,
      ],
      providers: [provideToastr()],
    }).compileComponents();

    toast = TestBed.inject(ToastrService);
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
          .getMovieData(0, 10, undefined, undefined)
          .subscribe((result: any) => expect(result).toBe(fakedFetchedList)),
      ),
    );
  });

  it('should trigger onChangeYear', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let field: HTMLInputElement = fixture.debugElement.query(
        By.css('#filter-year'),
      ).nativeElement;

      expect(field.value).toBe('');

      field.value = '2000';
      field.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.filterYear).toBe('2000');
    });
  }));

  it('should trigger onChangeYear', async(() => {
    const componentSpy = spyOn(component, 'onChangeWinner');
    const serviceSpy = spyOn(service, 'getMovieData');

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let field: HTMLSelectElement = fixture.debugElement.query(
        By.css('#filter-winner'),
      ).nativeElement;

      expect(field.value).toBe('0');

      field.value = '1';
      field.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.filterWinner).toBe(1);
    });
  }));
});
