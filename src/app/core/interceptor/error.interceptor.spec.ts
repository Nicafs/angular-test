import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let service: ErrorInterceptor;
  let httpMock: HttpTestingController;
  const toastrServiceSpy: jasmine.SpyObj<ToastrService> = jasmine.createSpyObj(
    'AuthenticationService',
    ['login'],
  );

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting(),
    );

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        ErrorInterceptor,
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
    });

    service = TestBed.get(ErrorInterceptor);
    httpMock = TestBed.get(HttpTestingController);
  });

  // Is called after each tests to verify that there are no outstanding http calls
  afterEach(() => {
    httpMock.verify();
  });

  it('Deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });
});
