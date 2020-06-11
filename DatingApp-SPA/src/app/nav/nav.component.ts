import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService, 
    private router: Router) { }

  ngOnInit() {
  }
   /*
   * Method to send to auth service after typing information
   */
  login(){
    // Subscribe to the auth service if successfull
    this.authService.login(this.model).subscribe(next => {
      // Log logged in successfully
      this.alertify.success('Logged in successfully');
      // return error if logged in incorrectly
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }
  /*
  * Method to check if the user is logged in 
  */

  loggedIn()
  {
    return this.authService.loggedIn();
  }
  /*
  * Method to handle logging out
  */
  logout()
  {
    // delete the web token from local storage
    localStorage.removeItem('token');
    // log logging out
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}
