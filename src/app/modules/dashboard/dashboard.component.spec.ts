import {
  ComponentFixture,
  TestBed,
  async,
  inject,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrService, provideToastr } from 'ngx-toastr';

import { MovieService } from '@app/core/services/movie/movie.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: MovieService;
  let toast: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, HttpClientModule, BrowserAnimationsModule],
      providers: [provideToastr()],
    }).compileComponents();

    toast = TestBed.inject(ToastrService);
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

  it('should trigger onChangeYear', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let input = fixture.debugElement.query(By.css('#filter-year'));
      let el = input.nativeElement;

      expect(el.value).toBe('');

      el.value = '2000';
      el.dispatchEvent(new Event('input'));

      expect(component.filterYear).toBe('2000');
    });
  }));
});
