import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values: any;
  constructor(private http: HttpClient) { }
  
  /*
  * Get the values once home page starts
  */
  ngOnInit() {
    this.getValues();
  }
  /*
  * Method to handle register toggle
  */
  registerToggle(){
    this.registerMode = true;
  }
  /*
  * Method to get all of the values in the API
  */
  getValues() {
    this.http.get('http://localhost:5000/api/values').subscribe(response => {
      this.values = response;
    }, error => {
      console.log(error);
    });
  }
  /*
  * Method to handle canceling the register mode
  */
  cancelRegisterMode(registerMode: boolean)
  {
    this.registerMode = registerMode;
  }

}
