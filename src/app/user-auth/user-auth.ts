import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { login, SignUp } from '../data-type';
import { User } from '../services/user';

@Component({
  selector: 'app-user-auth',
  imports: [CommonModule , FormsModule],
  templateUrl: './user-auth.html',
  styleUrl: './user-auth.css',
})
export class UserAuth implements OnInit{

  showLogin: boolean = true;
  constructor(private user : User){}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data:SignUp){

    this.user.userSignUp(data);
    // console.warn("User Data is ", data);
  }

  Login(data:login)
  {
    this.user.userLogin(data)
  }

  openSignUp()
  {
    this.showLogin = false;
  }

  openLogin()
  {
    this.showLogin = true;
  }
}
