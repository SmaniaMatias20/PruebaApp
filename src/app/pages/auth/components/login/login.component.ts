import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    NgIf
  ],
})
export class LoginComponent {
  @Output() payload = new EventEmitter();

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      emailOrUser: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { emailOrUser, password } = this.loginForm.value;

      const isEmail = /\S+@\S+\.\S+/.test(emailOrUser);
      const payload = isEmail
        ? { email: emailOrUser, password }
        : { username: emailOrUser, password };


      this.payload.emit(payload);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
