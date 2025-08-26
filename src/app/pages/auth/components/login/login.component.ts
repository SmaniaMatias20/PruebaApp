import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonItem, IonInput, IonContent } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
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

      console.log('Login payload:', payload);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
