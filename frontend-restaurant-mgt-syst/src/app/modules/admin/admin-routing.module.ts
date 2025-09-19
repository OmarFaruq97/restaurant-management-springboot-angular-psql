import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboaedComponent } from './admin-components/dashboaed/dashboaed.component';

const routes: Routes = [{ path: 'dashboard', component: DashboaedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
