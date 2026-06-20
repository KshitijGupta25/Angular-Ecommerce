import { Component, OnInit } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink ,TitleCasePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  menuType: string = 'default';
  sellerName: string = '';
  constructor(private route: Router){}

  ngOnInit():void{
    this.route.events.subscribe((val:any)=> {
      if(val.url)
      {
        console.log(val.url)
        if(localStorage.getItem('seller') && val.url.includes('seller'))
        {
          console.warn("In Seller Area");
          this.menuType = "seller";
          if(localStorage.getItem('seller'))
          {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore);
            this.sellerName = sellerData[0].name;

          }
        }
        else
        {
          console.warn("Outside Seller");
          this.menuType = "default";
        }
      }
    })
  }

  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['']);
  }
}
