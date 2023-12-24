import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { environment } from 'src/environments/environment';
import { observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    return this.http.post(environment.userRegisterUrl, user);
  }

  getLoggedUserEmail(){
    return localStorage.getItem('email')
  }
  login(details: any) {
    let payload = {
      email: details.email,
      password: details.password,
    };
    return this.http.post(environment.userLoginUrl, payload);
  }

  getUsers() {
    return this.http.get(
      `https://recipe-app-bb4fa-default-rtdb.firebaseio.com/users.json`
    );
  }
  updateRecent(data:any){
   const email =  this.getLoggedUserEmail();
   if(email){
    const payload = {
      email:JSON.parse(email),
      recipe:data
    }
    return this.http.post(environment.updateRecent , payload)
   }
   else{
       alert("user not logged in")
       return of("failed") 
   }
  }
  
}
