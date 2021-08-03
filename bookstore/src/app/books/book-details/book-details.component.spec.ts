import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import { MaterialModule } from 'src/app/shared/material.module';
import { Book } from '../shared/book.model';
import { BookService } from '../shared/book.service';

import { BookDetailsComponent } from './book-details.component';


const BOOKS: Book[] = [{
  id: 1,
  title: 'Pride and Prejudice',
  description: `Since its immediate success in 1813,Pride and Prejudice has remained one of the most popular novels in the English language`,
  author: 'Jane Austen',
  genre: 'Romantic',
  sold: 5000,
  dateOfPublication: new Date('10/10/2000'),
  iconUrl: 'https://blog.timesunion.com/localarts/files/2017/02/pride-and-prejudice-1.jpg',
  language: 'English',
  country: 'United Kingdom',
  mediaType: 'Print',
  publisher: 'T. Egerton, Whitehall',
  rating: 4
}
]
const mockErrorResponse = { status: 400, statusText: 'Bad Request' };

class MockBookService {

  findBookById(bookId: number): Observable<Book> {
    return of(BOOKS[0]);
  }

  findBookByIdError(bookId: number): any {
    return of(mockErrorResponse);
  }
 
}

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let bookService;
  let response: any;
  let errResponse: any;
  const mockErrorResponse = { status: 400, statusText: 'Bad Request' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookDetailsComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, MaterialModule, BrowserAnimationsModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          params: of({ id: 1 })
        }
      }, {provide: BookService, useClass: MockBookService}]
    })
      .compileComponents();
      bookService = TestBed.inject(BookService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get book detail', () => {
    spyOn(bookService, 'findBookById').and.callThrough();
    fixture.detectChanges();
    expect(component.bookForm.get('title')?.value).toEqual('Pride and Prejudice');
    expect(component.bookForm.get('author')?.value).toEqual('Jane Austen');
  });

  it('should test value of form', () => {
    spyOn(bookService, 'findBookById').and.callThrough();
    fixture.detectChanges();
    const formElement = fixture.debugElement.nativeElement.querySelector('#bookForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(10);
    expect(inputElements[0].value).toEqual('Pride and Prejudice');
    expect(inputElements[2].value).toEqual('Romantic');
  });

  // it('should call error snackbar', () => {
  //   spyOn(bookService, 'findBookById').and.throwError("error");
  //   const snackBarSpy = spyOn(component, 'openSnackBarForError');
  //   fixture.detectChanges();
  //   expect(component.openSnackBarForError).toHaveBeenCalled();
  // });

});
