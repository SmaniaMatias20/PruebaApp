import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { IonicModule } from '@ionic/angular';
import { Auth } from '../../services/auth/auth';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent, IonicModule, RegisterComponent],
})
export class AuthPage implements OnInit {

  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  age: number = 0;

  constructor(private router: Router, private auth: Auth) { }

  ngOnInit() {
    this.email = "";
    this.password = "";
    this.firstName = "";
    this.lastName = "";
    this.age = 0;
  }

  async onLogin(payload: any) {
    try {
      const { success, message } = await this.auth.login(payload.email, payload.password);
      if (success) {
        this.router.navigate(['home'], { replaceUrl: true });
      }
    } catch (error) {
      console.log(error);
    }

  }

  async onRegister(payload: any) {
    try {
      const { success, message } = await this.auth.register(payload.email, payload.password, payload.firstName, payload.lastName, payload.age);
      if (success) {
        this.router.navigate(['home'], { replaceUrl: true });
      }
    } catch (error) {
      console.log(error);
    }
  }



}
