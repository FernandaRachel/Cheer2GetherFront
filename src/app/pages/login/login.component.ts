import { Component, OnInit } from '@angular/core';
import { FacebookLoginProvider, AuthService, SocialUser } from 'angularx-social-login';
import { SessionStorageService } from "ngx-webstorage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService, private _sessionStorage: SessionStorageService) { }

  ngOnInit(): void {
     this.authService.authState.subscribe((user) => {
       if (user) {
        this.storageUser();
        console.log(user);
        this.user = user;
        this.loggedIn = (user != null);
       }
    });
  }

  storageUser(): any {
    debugger
    this._sessionStorage.store('user', this.user);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

   signOut(): void {
    this.authService.signOut();
  }
}
