import { Component, OnInit, signal } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../services/product';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule , CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProductList = signal<product[]>([]);
  
  constructor(private product: Product){}

  ngOnInit(): void {
    this.product.getPopularProducts().subscribe((result)=>{
      console.log("Popular products list----", result)
      this.popularProductList.set(result);
      console.warn(this.popularProductList());
    });
  }

}
