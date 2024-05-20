import { Routes } from '@angular/router';
import { LandingComponent } from './Components/Landing/landing/landing.component';
import { HomeComponent } from './Components/Home/home/home/home.component';
import { AuthGuard } from './Guards/auth.guard';
import { CartComponent } from './Components/CheckOut/cart/cart/cart.component';
import { CategorylistComponent } from './Components/Home/CollectionItems/CollectionCategory/categorylist/categorylist.component';
import { AddcartComponent } from './Components/Home/AddToCartView/addcart/addcart.component';
import { AthmovilComponent } from './Components/CheckOut/CheckOutWithATHMovil/athmovil/athmovil.component';
import { SalesComponent } from './Components/Sales/Sales/sales/sales.component';

export const routes: Routes = [
    {path:'landing', component:LandingComponent},
    {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
    {path:'cart', component:CartComponent, canActivate:[AuthGuard]},
    {path:'collection/:collectionName', component: CategorylistComponent, canActivate:[AuthGuard]},
    {path:'addToCart/:ID', component:AddcartComponent, canActivate:[AuthGuard]},
    {path:'Sales', component:SalesComponent, canActivate:[AuthGuard]},
    // {path:'athMovil', component:AthmovilComponent, canActivate:[AuthGuard]},
    { path: '', redirectTo: '/landing', pathMatch: 'full' },

];
