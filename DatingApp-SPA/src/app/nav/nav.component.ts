import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private AuthService: AuthService) { }

  ngOnInit() {
  }
   /*
   * Method to send to auth service after typing information
   */
  login(){
    // Subscribe to the auth service if successfull
    this.AuthService.login(this.model).subscribe(next => {
      // Log logged in successfully
      console.log('Logged in successfully');
      // return error if logged in incorrectly
    }, error => {
      console.log(error);
    });
  }
  /*
  * Method to check if the user is logged in 
  */

  loggedIn()
  {
    // get the token from local storage
    const token = localStorage.getItem('token');
    // return true or false
    return !!token;
  }
  /*
  * Method to handle logging out
  */
  logout()
  {
    // delete the web token from local storage
    localStorage.removeItem('token');
    // log logging out
    console.log('logged out');
  }

}
