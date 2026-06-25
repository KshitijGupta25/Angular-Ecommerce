import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit{

  productId = signal<string | null>(null);
  productQuantity: number = 1;
  productDetails = signal<product | undefined>(undefined);
  constructor(private activeRoute: ActivatedRoute , private product: Product){}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.productId.set(params.get('productId'));
      const param  = this.productId();
      // console.log("Query From subscription is ", this.productId());
      if(param)
      {
        this.product.getProductById(param).subscribe((result)=>{
          if(result)
          {
            this.productDetails.set(result);
            // console.warn("Details----->",this.productDetails());
          }
        });
      }
    });
    
  }


  handleQuantity(operation : string)
  {
    if(this.productQuantity < 20 && operation === "plus")
    {
      this.productQuantity+=1;
    }
    else if(this.productQuantity > 1 && operation === "min")
    {
      this.productQuantity-=1;
    }
  }
}
