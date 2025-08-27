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

  constructor(private router: Router, private auth: Auth) { }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(['home']);
  }

}
