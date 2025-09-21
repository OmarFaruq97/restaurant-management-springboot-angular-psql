import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboaedComponent } from './admin-components/dashboard/dashboard.component';

const routes: Routes = [{ path: 'dashboard', component: DashboaedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
