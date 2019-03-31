// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public jwtHelper: JwtHelperService,
    private _sessionStorage: SessionStorageService) {}
  // ...
  public isAuthenticated(): boolean {
    const user = this._sessionStorage.retrieve('user');
    console.log(user);
    // return true;
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(user.authToken);
  }
}
