import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  notificationCount: number = 0;

  logout(): void {
    // This will be implemented when we create the auth service
    console.log('Logout clicked');
  }
}
