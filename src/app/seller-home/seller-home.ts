import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../services/product';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faTrash , faEdit} from '@fortawesome/free-solid-svg-icons';
import { RouterLink  , Router} from "@angular/router";


@Component({
  selector: 'app-seller-home',
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  standalone: true,
  templateUrl: './seller-home.html',
  styleUrl: './seller-home.css',
})
export class SellerHome implements OnInit {

  productList = signal<product[]>([]);
  deleteIcon = faTrash;
  editIcon = faEdit;
  deletProductMessage = signal<string | undefined>(undefined);
  constructor(private product:Product){}

  ngOnInit(): void{
    this.fetchProductList();
  }

  deleteProduct(id:string)
  {
    console.log("Id is ", id);
    this.product.deleteProduct(id).subscribe((result)=>{
        if(result)
        {
          this.deletProductMessage.set("Product Deleted Successfully");
          this.fetchProductList();
        }
        else
        {
          this.deletProductMessage.set(undefined);
        }
    });

    setTimeout(()=>{
      this.deletProductMessage.set(undefined)
    },3000);
  }

  fetchProductList()
  {
    this.product.productList().subscribe((result)=>{
      console.log("List Of Products is",result);
      this.productList.set(result);
      console.log("Product List in variable is ", this.productList);
    });
  }
}
