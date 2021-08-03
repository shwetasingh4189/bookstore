import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { MaterialModule } from '../shared/material.module';

import { AuthService } from './auth.service';

class MatSnackBarStub{
  open(){
    return {
      onAction: () => of({})
    }
  }

}

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MaterialModule, BrowserAnimationsModule, RouterTestingModule],
      providers: [
        { provide: MatSnackBar , useClass: MatSnackBarStub }
      ]
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call router navigate for success login', () => {
    const navigateSpy = spyOn(router, 'navigate');
    service.login('admin', 'admin');
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should call openSnackBar for bad credentials', () => {
    const opensnackBarSpy = spyOn(service, 'openSnackBar');
    service.login('admin', 'ad');
    expect(opensnackBarSpy).toHaveBeenCalled();
  });

});
