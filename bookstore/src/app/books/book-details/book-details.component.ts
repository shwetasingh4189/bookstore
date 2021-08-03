import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppConfig } from 'src/app/config/app.config';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  bookForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private actRoute: ActivatedRoute, private router: Router,
    private bookService: BookService, public snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      id: [],
      title: [{ disabled: true, value: '' }, Validators.required],
      description: [{ disabled: true, value: '' }, Validators.required],
      author: [{ disabled: true, value: '' }, Validators.required],
      genre: [{ disabled: true, value: '' }],
      sold: [{ disabled: true, value: '' }],
      iconUrl: [{ disabled: true, value: '' }],
      dateOfPublication: [{ disabled: true, value: '' }],
      language: [{ disabled: true, value: '' }],
      country: [{ disabled: true, value: '' }],
      mediaType: [{ disabled: true, value: '' }],
      publisher: [{ disabled: true, value: '' }],
      rating: [{ disabled: true, value: '' },]
    });

    this.bookService.findBookById(this.actRoute?.snapshot?.params?.id).subscribe(book => {
      this.bookForm.setValue(book);
    },
      error => {
        this.openSnackBarForError();
      });
  }

  openSnackBarForError() {
    this.snackBar.open('Error occured while accessing Data. Please run backend server', 'Close', { duration: AppConfig.snackBarDuration });
  }

  openSnackBarForEdit() {
    this.snackBar.open('Edit functionality is work in progress', 'Close', { duration: AppConfig.snackBarDuration });
  }

  onEdit() {
    this.bookForm.enable();
    this.openSnackBarForEdit();
  }

  onBack() {
    this.router.navigate(['/books']);
  }

}
