import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// NG-ZORRO modules
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { StorageService } from './auth-services/storage-service/storage.service';
import { AdminRoutingModule } from "./modules/admin/admin-routing.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    NzLayoutModule,
    NzButtonModule,
    NzFormModule,
    AdminRoutingModule
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend-restaurant-mgt-syst';

  isAdminLoggedIn : boolean = StorageService.isAdminLoggedIn();
  isCustomerLoggedIn : boolean = StorageService.isCustomerLoggedIn();

  constructor (private router : Router){}

  ngOnInit(){
    this.router.events.subscribe(event =>{
      if(event.constructor.name ==="NavigationEnd"){
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      }
    })
  }
//   logout() {
//   StorageService.clear(); // clear token & user
//   this.isAdminLoggedIn = false;
//   this.isCustomerLoggedIn = false;
//   this.router.navigateByUrl('/login');
// }

}
