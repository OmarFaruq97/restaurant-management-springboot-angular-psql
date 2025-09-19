import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { StorageService } from '../../auth-services/storage-service/storage.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSpinning: boolean = false;

  constructor(private service: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  submitForm(): void {
    this.service.login(this.loginForm.value).subscribe((res) => {
      console.log(res);
      if (res.userId != null) {
        const user = {
          id: res.userId,
          role: res.userRole,
        };
        console.log(user);
        StorageService.saveToken(res.jwt);
        StorageService.saveUser(user);
      } else {
        console.error('Wronge credetials from error');
        console.log('Wronge credetials from log');
      }
    });
  }
}
