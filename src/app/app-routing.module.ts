import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import {AuthGuardService as AuthGuard} from './auth/auth.guard';
import { CommunityComponent } from './pages/community/community.component';
import { AuthGuardLoginService as AuthLogin } from './auth/auth-login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthLogin] },
  { path: 'main-page', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'community', component: CommunityComponent},
  { path: 'news', component: NewsPageComponent, canActivate: [AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
