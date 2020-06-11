import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jtwHelper = new JwtHelperService();
  decodedToken: any;

constructor(private http: HttpClient) { }
/*
* Method to send a request to login api and grab response
*/
login(model: any) {
  // return a post to login url string
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(
    // map the response
    map((response: any) => {
      const user = response;
      if(user){
        // put the token in the local storage client
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jtwHelper.decodeToken(user.token);
        console.log(this.decodedToken);
      }
    })
  );
}
/*
*Method to send a request to the register api
*/
register(model: any)
{
  return this.http.post(this.baseUrl + 'register', model);
}

loggedIn()
{
  const token = localStorage.getItem('token');
  return !this.jtwHelper.isTokenExpired(token);
}
}
