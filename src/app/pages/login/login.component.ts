import { Component, OnInit } from '@angular/core';
import { FacebookLoginProvider, AuthService, SocialUser } from 'angularx-social-login';
import { SessionStorageService } from "ngx-webstorage";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(
    private authService: AuthService,
    private _sessionStorage: SessionStorageService,
    private _router: Router) { }

  ngOnInit(): void {
     this.authService.authState.subscribe((user) => {
       if (user) {
        this.user = user;
        this.storageUser();
        console.log(user);
        this.loggedIn = (user != null);
       }
    });
  }

  storageUser(): any {
    debugger
    this._sessionStorage.store('user', this.user);
    localStorage.setItem('user', this.user.authToken);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then((v) => {
      this._router.navigate(['/main-page']);
    });
  }

   signOut(): void {
    this._sessionStorage.clear('user');
    this.authService.signOut();
    this._router.navigate(['/dashboard']);
  }
}
