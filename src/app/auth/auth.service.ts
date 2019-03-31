// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    // private jwtHelper: JwtHelperService,
    private _sessionStorage: SessionStorageService) {}
  // ...
  public isAuthenticated(): boolean {
    const user = this._sessionStorage.retrieve('user');
    console.log(user);
    debugger
    if (!user) {
      return false;
    }

    return true;
    // return !this.jwtHelper.isTokenExpired(user.authToken);
  }
}
