import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppConfig } from '../config/app.config';
import { User } from '../user/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!: User;
  constructor(public router: Router, public snackBar: MatSnackBar) { 
  
  	if( this.user ) {
  		localStorage.setItem('user', JSON.stringify(this.user));

  	} else {
  		localStorage.setItem('user', '')
  	}
  }
  
   login(username: string, password: string): void {
  	try {	
		if(username == 'admin' && password == 'admin'){
			this.router.navigate(["books"]);
		   }
		else {
			this.openSnackBar();
		   } 
   } catch (error) {
   	console.log(error);
   }
  }

  openSnackBar() {
    this.snackBar.open('Invalid Credentials. Please login again', 'Close', { duration: AppConfig.snackBarDuration });
  }

}
