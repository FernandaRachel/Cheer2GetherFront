import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import {AuthGuardService as AuthGuard} from './auth/auth.guard';
import { CommunityComponent } from './pages/community/community.component';

import { AuthGuardService } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main-page', component: MainPageComponent, canActivate: [AuthGuardService] },
  { path: 'community', component: CommunityComponent},
  { path: 'news', component: NewsPageComponent, canActivate: [AuthGuardService]},
  { path: '**', pathMatch: 'full', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
