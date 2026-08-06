import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.signupForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const { name, email, password } = this.signupForm.value;

    this.authService.checkEmailExists(email).subscribe({
      next: (exists) => {
        if (exists) {
          this.errorMessage = 'Email is already registered.';
          this.loading = false;
        } else {
          this.authService.signup({ name, email, password }).subscribe({
            next: () => {
              this.loading = false;
              this.router.navigate(['/']);
            },
            error: () => {
              this.errorMessage = 'Failed to create account. Please try again.';
              this.loading = false;
            }
          });
        }
      },
      error: () => {
        this.errorMessage = 'An error occurred. Please try again.';
        this.loading = false;
      }
    });
  }
}
