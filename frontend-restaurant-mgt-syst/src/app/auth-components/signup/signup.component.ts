import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzNotificationModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;

  loading = false;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        name: this.fb.control('', {
          validators: [Validators.required, Validators.minLength(3)],
          nonNullable: true,
        }),
        email: this.fb.control('', {
          validators: [Validators.required, Validators.email],
          nonNullable: true,
        }),
        password: this.fb.control('', {
          validators: [Validators.required, Validators.minLength(5)],
          nonNullable: true,
        }),
        confirmPassword: this.fb.control('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator to match password and confirmPassword
  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  register(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      console.log('Form is invalid:', this.signupForm.errors);
      return;
    }

    this.loading = true;
    console.log('Submitting form with values:', this.signupForm.value);

    this.service.signup(this.signupForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        console.log('API response:', res);

        if (res.id) {
          this.notification.success(
            'SUCCESS',
            'You are registered successfully',
            { nzDuration: 5000 }
          );

          // Run form reset in NgZone to ensure UI updates
          this.zone.run(() => {
            // Reset the form completely
            this.signupForm.reset();
            // Manually clear form controls to ensure UI update
            this.signupForm.patchValue({
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
            });
            // Mark form as pristine and untouched
            this.signupForm.markAsPristine();
            this.signupForm.markAsUntouched();
            // Trigger change detection
            this.cdr.detectChanges();
            // Delay UI update to ensure NG-Zorro sync
            setTimeout(() => {
              this.cdr.detectChanges();
              console.log('Form reset, current values:', this.signupForm.value);
            }, 0);
          });
        } else {
          this.notification.error('ERROR', 'Something went wrong', {
            nzDuration: 5000,
          });
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('API error:', err);
        this.notification.error('ERROR', err.error.message || 'Server error', {
          nzDuration: 5000,
        });
      },
    });
  }
}