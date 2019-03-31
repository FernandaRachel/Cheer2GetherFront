import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';

@Component({
 selector: 'app-header',
 templateUrl: './header.component.html',
 styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isCollapsed: boolean = true;
  user: any;

  constructor(
    private _sessionStorage: SessionStorageService,
    private authService: AuthService,
    private _router: Router
    ) { }

  ngOnInit() {
    this.user = this._sessionStorage.retrieve("user");
    this._sessionStorage.observe("user")
    .subscribe((resp) => {
      this.user = resp;
      console.log(resp);
    });
  }

   signOut(): void {
    this._sessionStorage.clear('user');
    this.authService.signOut();
    this._router.navigate(['/dashboard']);
  }
}
