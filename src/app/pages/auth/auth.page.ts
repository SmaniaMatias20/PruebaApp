import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IonicModule } from '@ionic/angular';
import { Auth } from '../../services/auth/auth';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent, IonicModule],
})
export class AuthPage implements OnInit {

  emailOrUser: string = '';
  password: string = '';

  constructor(private router: Router, private auth: Auth) { }

  ngOnInit() {
  }

  async onLogin(payload: any) {
    try {
      const { success, message } = await this.auth.login(payload.email, payload.password);
      if (success) {
        this.router.navigate(['home']);
      }
    } catch (error) {
      console.log(error);
    }

  }



}
