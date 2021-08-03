import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksModule } from './books/book.module';
import { BookService } from './books/shared/book.service';
import { AppConfig, APP_CONFIG } from './config/app.config';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './shared/material.module';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BooksModule,
    CoreModule
  ],
  providers: [
    {provide: APP_CONFIG, useValue: AppConfig},
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
