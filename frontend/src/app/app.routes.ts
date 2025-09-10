import { Routes } from '@angular/router';
import { CategoryListComponent } from './components/category/category';
import { ProductListComponent } from './components/product/product';

export const routes: Routes = [
  { path: 'categories', component: CategoryListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/categories', pathMatch: 'full' }
];

