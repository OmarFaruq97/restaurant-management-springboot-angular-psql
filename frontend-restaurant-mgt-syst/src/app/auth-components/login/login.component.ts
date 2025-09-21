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
import { Router, RouterModule } from '@angular/router';
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
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  submitForm(): void {
    if (this.loginForm.invalid) {
      this.message.error('Please fill in all required fields correctly.');
      return;
    }

    this.service.login(this.loginForm.value).subscribe({
      next: (res) => {
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
          this.message.error('Invalid credentials! Please try again.');
        }
      },
      error: () => {
        this.message.error('Wrong email or password!');
      },
    });
  }
}
