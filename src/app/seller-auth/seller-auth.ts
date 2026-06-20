import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Seller } from '../services/seller';
import { Router } from '@angular/router';
import { login, SignUp } from '../data-type';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule , CommonModule],
  templateUrl: './seller-auth.html',
  styleUrl: './seller-auth.css',
})
export class SellerAuth implements OnInit {

  constructor(public seller: Seller , private router: Router , private cdr : ChangeDetectorRef){}
  showLogin = false;
  authError:string = '';

  ngOnInit():void{

     this.seller.reloadSeller();
  }
  
  signUp(data:SignUp):void
  {
    console.warn(data);
    this.seller.userSignUp(data);
  }

  login(data:login):void
  {
    this.authError = '';
    this.seller.userLogin(data);
    setTimeout(() => {
    if (this.seller.isLoginError) {
      this.authError = 'Email or password is incorrect';
      this.cdr.detectChanges();
      console.log(this.authError);
    } else {
      this.authError = '';
      this.cdr.detectChanges();
    }

  }, 100);
  }

  openLogin()
  {
    this.showLogin = !this.showLogin
  }

  openSignUp()
  {
    this.showLogin = !this.showLogin
  }
}
