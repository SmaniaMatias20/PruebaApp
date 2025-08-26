import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [LoginComponent, IonicModule],
})
export class AuthComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }

  goToHome() {
    this.router.navigate(['home']);
  }

}
