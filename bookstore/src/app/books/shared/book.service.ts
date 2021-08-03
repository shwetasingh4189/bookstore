import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Book } from './book.model';
import {map} from "rxjs/operators";
import { AppConfig } from 'src/app/config/app.config';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  findAllBooks(): Observable<Book[]> {
    return this.http.get(AppConfig.endpoints.booksBaseUrl)
        .pipe(
            map(res => res['payload'])
        );
}

findBookById(bookId: number): Observable<Book> {
  return this.http.get<Book>(AppConfig.endpoints.booksBaseUrl+`${bookId}`);
}

}
