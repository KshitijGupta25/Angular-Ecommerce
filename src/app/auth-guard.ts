import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Seller } from './services/seller';

export const authGuard: CanActivateFn = (route, state) => {

  const seller = inject(Seller);
  if(localStorage.getItem('seller'))
  {
      return true;
  }
  return seller.isSellerLoggedIn;
};
