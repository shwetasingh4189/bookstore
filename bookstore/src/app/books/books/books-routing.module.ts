import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListsComponent } from '../book-lists/book-lists.component';
import { BookComponent } from '../book.component';

const bookRoutes: Routes = [
  {
    path: '',
    component: BookComponent,
    children: [
      {path: '', component: BookListsComponent, data: {'title': 'Books'} },
     // {path: ':id', component: BookListDetailComponent, data: {'title': 'BookDetail'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(bookRoutes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
