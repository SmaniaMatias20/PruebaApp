import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [IonicModule, RouterLink],
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private auth: Auth) { }

  ngOnInit() { }

  logOut() {
    try {
      this.auth.logout();
    } catch (error) {
      console.log(error);
    }
  }


}
