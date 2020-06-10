import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // output to handle register from a child compnent
@Output() cancelRegister = new EventEmitter();
// create model
model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
/*
* Method to handle input from a form after registering a new profile
*/
  register()
  {
    // subscribe to the auth service 
    this.authService.register(this.model).subscribe(() => {
      // if creation successful return success
      console.log('registration successful');
      // other wise log the error
    }, error => {
      console.log(error);
    });
  }
  /*
  * Method to cancel registeration
  */
  cancel(){
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
