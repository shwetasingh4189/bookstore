import { inject, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { BookService } from './book.service';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let response: any;
  let errResponse: any;
  const data = 'Invalid request parameters';
  const mockErrorResponse = { status: 400, statusText: 'Bad Request' };

  beforeEach(() => {
    //Configures testing app module
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BookService
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BookService);
  });


  it('should be created', inject([BookService], (service: BookService) => {
    expect(service).toBeTruthy();
  }));

  it('findAllBooks() should call http Get method for the given route', () => {

    //Set Up Data
    const bookValues = [{
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
    }];

    service.findAllBooks().subscribe((books) => {
      //Assert-1
      expect(books.length).toBe(3);
      expect(books).toEqual(bookValues);

    });

    //Assert -2
    const req = httpMock.expectOne('/api/books/');

    //Assert -3
    httpMock.verify();

  });

  it('findAllBooks() should throw error', () => {
    service.findAllBooks().subscribe(res => response = res, err => errResponse = err);
    httpMock.expectOne('/api/books/').flush(data, mockErrorResponse);
    expect(errResponse.error).toBe(data);
  });

  it('findBookById() should call http Get method for the given route', () => {

    //Set Up Data
    const bookValues = [{
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
    }];

    service.findBookById(1).subscribe((book) => {
      expect(book.title).toEqual('Pride and Prejudice');
      expect(book.author).toEqual('Jane Austen');
    });

    httpMock.expectOne('/api/books/1');
    httpMock.verify();

  });

  it('findBookById() should throw error', () => {
    service.findBookById(1).subscribe(res => response = res, err => errResponse = err);
    httpMock.expectOne('/api/books/1').flush(data, mockErrorResponse);
    expect(errResponse.error).toBe(data);
  });

});
