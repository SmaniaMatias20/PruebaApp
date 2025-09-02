import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,

  ],
})
export class RegisterComponent implements OnInit {
  @Output() payload = new EventEmitter();
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      age: ['', [Validators.required, Validators.max(99), Validators.min(18)]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, confirmPassword, age, firstName, lastName } = this.registerForm.value;

      if (!this.checkPasswords(password, confirmPassword)) {
        return;
      }

      const payload = { email, password, confirmPassword, age, firstName, lastName };
      this.payload.emit(payload);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  checkPasswords(password: any, confirmPassword: any) {
    if (password !== confirmPassword) {
      this.registerForm.get('confirmPassword')?.setErrors({ mismatch: true });
    }

    return password === confirmPassword;
  }
}
