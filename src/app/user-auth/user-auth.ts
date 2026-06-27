import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignUp } from '../data-type';
import { User } from '../services/user';

@Component({
  selector: 'app-user-auth',
  imports: [CommonModule , FormsModule],
  templateUrl: './user-auth.html',
  styleUrl: './user-auth.css',
})
export class UserAuth {

  constructor(private user : User){}

  signUp(data:SignUp){

    this.user.userSignUp(data);
    // console.warn("User Data is ", data);
  }
}
