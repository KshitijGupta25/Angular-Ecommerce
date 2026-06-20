import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class Seller {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError:boolean =false;

  constructor(private http:HttpClient , private router: Router){}
  userSignUp(data: SignUp) 
  {
    console.warn("Service Called");
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result: HttpResponse<any>) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
      console.warn("Result is", result);
    });
  }
  reloadSeller()
  {
    if(localStorage.getItem('seller'))
    {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: login){

    console.warn("Data in service is",data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result: any) => {
      console.warn(result);
      if(result && result.body && result.body.length)
      {
        console.warn("User Logged In");
        this.isLoginError = false;
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }
      else
      {
        console.warn("Login Failed");
        this.isLoginError = true;
      }
    });

  }
}
