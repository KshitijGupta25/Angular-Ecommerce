import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';
import { product } from '../data-type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {

  query = signal<string | null>(null);
  searchResult = signal<product[] | undefined>(undefined);
  errorMessage = signal<string | undefined>(undefined);

  constructor(private activeRoute: ActivatedRoute , private product: Product){}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.query.set(params.get('query'));
      const param  = this.query();
      // console.log("Query From subscription is ", this.query());
      if(param)
      {
        this.product.searchProduct(param).subscribe((result)=>{
          if(result.length > 0)
          {
            this.searchResult.set(result);
          }
          else
          {
            this.errorMessage.set("No Such Product Found!!!");
          }
        });
      }
    });

  }
}
