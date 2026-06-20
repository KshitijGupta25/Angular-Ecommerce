import { Component,ChangeDetectorRef,NgZone, signal, ViewChild} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../services/product';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule,CommonModule],
  templateUrl: './seller-add-product.html',
  styleUrl: './seller-add-product.css',
})
export class SellerAddProduct {
  
  @ViewChild('addProduct') addProductForm!: NgForm; 
  addProductMessage = signal<string | undefined>(undefined);
  constructor(private product: Product , private cdr: ChangeDetectorRef , private ngZone: NgZone){ }
  submitProduct(data:product)
  {
    this.product.addProduct(data).subscribe((result)=>{
      console.warn("Added Result Is --->",result);
        if(result)
        {
          this.addProductMessage.set("Product is successfully added");
          this.cdr.detectChanges();
          this.addProductForm.reset();
          console.log("Message is ---->", this.addProductMessage)
          setTimeout(()=> {
            this.addProductMessage.set(undefined);
            this.cdr.detectChanges();
          }, 3000);
        }
    });
  }
}
