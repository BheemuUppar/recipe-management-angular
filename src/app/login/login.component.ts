import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../services/loader.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  currentUser: User | undefined;
  isLoading = false;
  onLoginMessage : any = null;
  constructor(private userService: UserService, private router: Router,
    private loaderService : LoaderService,
    private actRoute:ActivatedRoute
    ) {}

  ngOnInit(): void {
    // getting services
    this.userService.getUsers().subscribe((data: any) => {
      for (let key in data) {
        this.users.push(data[key]);
      }
    });
    if(localStorage.getItem('currentUser')){
     this.router.navigateByUrl('/home')
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required , Validators.email]),
    password: new FormControl('' , [Validators.required]),
  });

  login() {
    // this.loaderService.show()
    this.userService
      .login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe((data: any) => {
       this.onLoginMessage =  data.message
        localStorage.setItem('currentUser', JSON.stringify(data.data));
        if (data.message == 'login successfull') {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('email', JSON.stringify(this.loginForm.value.email))
          this.router.navigateByUrl('/home');
          // this.loaderService.hide();
        } else {
          
        }
      });
  }

  isValid(credential: any) {
    for (let i = 0; i < this.users.length; i++) {
      if (
        this.users[i].email == credential.email &&
        this.users[i].password == credential.password
      ) {
        this.currentUser = this.users[i];
        return true;
      }
    }
    return false;
  }
}
