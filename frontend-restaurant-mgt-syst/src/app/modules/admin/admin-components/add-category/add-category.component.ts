import { Component } from '@angular/core';
import { NzFormModule } from "ng-zorro-antd/form";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputDirective } from "ng-zorro-antd/input";

@Component({
  selector: 'app-add-category',
  imports: [NzFormModule, NzButtonModule, NzInputDirective],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

}
