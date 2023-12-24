import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService : UserService, private router :Router) { }

    passwordMatched : boolean = false;
    registerForm  =new FormGroup({
      userName : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required,  Validators.email]),
      password: new FormControl('',[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+-=]).{8,}$')]),
      cnfPassword : new FormControl('',[Validators.required])
    })

  ngOnInit(): void {
  }


  register(){
    if (
      this.registerForm.value.password == this.registerForm.value.cnfPassword
    ) {
      let user = {
        name: this.registerForm.value.userName,
        email: this.registerForm.value.email?.toLowerCase(),
        password: this.registerForm.value.password,
      };
      this.userService.registerUser(user).subscribe(
        (data: any) => {
          alert('User Registered Successfully!');
          this.router.navigateByUrl('/login');
        },
        (error) => {
          alert('Failed to Registered ');
        }
      );
    } else {
      alert('password and confirm password');
    }
  }

}
