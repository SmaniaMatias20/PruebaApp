import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar, IonButton, RouterLink],
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  logOut() {
    this.router.navigate(['auth']);
  }


}
