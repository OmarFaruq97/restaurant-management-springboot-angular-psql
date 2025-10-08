import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { AddCategoryComponent } from './admin-components/add-category/add-category.component';
import { PostProductComponent } from './admin-component/post-product/post-product.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'category', component: AddCategoryComponent },
  { path: 'product', component: PostProductComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
