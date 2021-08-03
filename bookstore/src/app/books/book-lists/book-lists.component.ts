import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfig } from 'src/app/config/app.config';
import { Book } from '../shared/book.model';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-book-lists',
  templateUrl: './book-lists.component.html',
  styleUrls: ['./book-lists.component.css']
})
export class BookListsComponent implements OnInit {

  bookList!: Book[];

  displayedColumns: string[] = ['title', 'description', 'author', 'genre', 'dateOfPublication'];
  dataSource = this.bookList;

  constructor(private bookService: BookService, public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.bookService.findAllBooks().subscribe(
      books => {
        this.dataSource = this.bookList = books;
      },
      error => {
        this.openSnackBar();
      }
    )

  }

  openSnackBar() {
    this.snackBar.open('Error occured while accessing Data. Please run backend server', 'Close', { duration: AppConfig.snackBarDuration });
  }

}
