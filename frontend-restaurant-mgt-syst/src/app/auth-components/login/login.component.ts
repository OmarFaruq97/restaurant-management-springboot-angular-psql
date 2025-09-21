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
import { Route, Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { StorageService } from '../../auth-services/storage-service/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';

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

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private massage: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });
  }
  submitForm(): void {
    if (this.loginForm.invalid) {
      console.error('Form invalid');
      return;
    }

    this.service.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('API Response:', res);

        if (res && (res.userId || res.id)) {
          const user = {
            id: res.userId ?? res.id,
            role: res.userRole ?? res.role,
          };

          StorageService.saveToken(res.jwt ?? res.token);
          StorageService.saveUser(user);

          if (StorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('/admin/dashboard');
          } else if (StorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('/customer/dashboard');
          }
        } else {
          this.massage.error('Invalid credentials! Please try again.');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.massage.error('Wrong email or password !');
      },
    });
  }
}
