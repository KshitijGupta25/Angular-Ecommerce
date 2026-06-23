import { Component, OnInit, signal } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { Product } from '../services/product';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  imports: [RouterLink ,TitleCasePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  menuType: string = 'default';
  sellerName: string = '';
  searchResult = signal<product[] | undefined>(undefined);
  constructor(private route: Router , private product: Product){}

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

  searchText(data:KeyboardEvent)
  {
    if(data)
    {
      const element = data.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result)=>{
        // console.warn(result);
        this.searchResult.set(result);
      })
    }

  }

  clearSearch()
  {
    this.searchResult.set(undefined);
  }
}
