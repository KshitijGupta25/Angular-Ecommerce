import { Component, OnInit, signal } from '@angular/core';
import { product } from '../data-type';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.html',
  styleUrl: './seller-update-product.css',
})
export class SellerUpdateProduct implements OnInit{

  productData = signal<product | undefined>(undefined);
  updateProductMessage = signal<string | undefined>(undefined);
  constructor(private route: ActivatedRoute , private product: Product , private router : Router){}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log("Product Id ",productId);
    productId && this.product.getProductById(productId).subscribe((data)=>{
      console.warn("Fetched Product is ",data);
      this.productData.set(data);
    })
  }

  submitProduct(data:product)
  {
    if(this.productData())
    {
      data.id = this.productData()!.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
        if(result)
        {
          this.updateProductMessage.set("Product Info Updated Successfully!!")
          setTimeout(()=>{
            this.updateProductMessage.set(undefined)
            this.router.navigate(['/seller-home']);
          },2000);
        }
    });
    
  }
}
