import { HttpClientModule } from '@angular/common/http';
import {  ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';
import { MaterialModule } from 'src/app/shared/material.module';
import { Book } from '../shared/book.model';
import { BookService } from '../shared/book.service';
import * as Rx from 'rxjs';

import { BookListsComponent } from './book-lists.component';
import { Observable } from 'rxjs/internal/Observable';

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

class MockBookService {

  findAllBooks(): Observable<Book[]> {
    return of(BOOKS);
}
 
}

describe('BookListsComponent', () => {
  let component: BookListsComponent;
  let fixture: ComponentFixture<BookListsComponent>;
  let bookService;

  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MaterialModule, BrowserAnimationsModule],
      providers: [{provide: BookService, useClass: MockBookService}],
      declarations: [BookListsComponent]
    })
      .compileComponents();
      bookService = TestBed.inject(BookService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListsComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all the books', () => {
    spyOn(bookService, 'findAllBooks').and.callThrough();
    fixture.detectChanges();
    expect(component.bookList).toBe(BOOKS);
  });

  it('should test the table ', (done) => {
    spyOn(bookService, 'findAllBooks').and.callThrough();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      let tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBe(2);

      // Header row
      let headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toBe(' Title ');
      expect(headerRow.cells[1].innerHTML).toBe(' Description ');

      // Data rows
      let row1 = tableRows[1];
      expect(row1.cells[2].innerHTML).toBe(' Jane Austen ');
      expect(row1.cells[3].innerHTML).toBe(' Romantic ');
      done();
    });
  });

});
