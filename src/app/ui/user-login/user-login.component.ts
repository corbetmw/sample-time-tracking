import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(public auth: AuthService,
              private router: Router) { }


  ngOnInit() {
  }


  logOut() {
    this.auth.signOut();
  }

  /// Shared

  private afterSignIn(): void {
    // Do after login stuff here, such router redirects, toast messages, etc.
    this.router.navigate(['/']);
  }

}
