import { Component, OnInit, signal } from '@angular/core';
import { product } from '../data-type';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.html',
  styleUrl: './seller-update-product.css',
})
export class SellerUpdateProduct implements OnInit{

  productData = signal<product | undefined>(undefined);
  constructor(private route: ActivatedRoute , private product: Product){}

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

  }
}
