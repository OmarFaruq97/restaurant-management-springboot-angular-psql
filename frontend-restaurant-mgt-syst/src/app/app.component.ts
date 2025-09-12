import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// NG-ZORRO imports
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true, // required for Angular 19
  imports: [
    RouterOutlet, // for routing
    NzLayoutModule, // for nz-layout, nz-header, nz-footer, etc.
    NzButtonModule, // for nz-button
    BrowserAnimationsModule, // required by NG-ZORRO components
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend-restaurant-mgt-syst';
}
