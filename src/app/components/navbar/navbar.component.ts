import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [IonicModule, RouterLink],
})
export class NavbarComponent implements OnInit {

  constructor(private auth: Auth) { }

  ngOnInit() { }

  async logOut() {
    try {
      await this.auth.logout();   // 👈 importante
    } catch (error) {
      console.log(error);
    }
  }



}
