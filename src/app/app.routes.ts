import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SellerAuth } from './seller-auth/seller-auth';
import { SellerHome } from './seller-home/seller-home';
import { authGuard } from './auth-guard';
import { SellerAddProduct } from './seller-add-product/seller-add-product';
import { SellerUpdateProduct } from './seller-update-product/seller-update-product';
import { Search } from './search/search';
import { ProductDetails } from './product-details/product-details';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'seller-auth',
        component: SellerAuth
    },
    {
        path: 'seller-home',
        canActivate: [authGuard],
        component: SellerHome
    },
    {
        path: 'seller-add-product',
        canActivate: [authGuard],
        component: SellerAddProduct
    },
    {
        path: 'seller-update-product/:id',
        canActivate: [authGuard],
        component: SellerUpdateProduct
    },
    {
        path:'search/:query',
        component: Search
    },
    {
        path:'details/:productId',
        component: ProductDetails
    }
];
