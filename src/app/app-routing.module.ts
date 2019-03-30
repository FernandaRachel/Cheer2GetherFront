import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main-page', component: MainPageComponent },
  // { path: '**', pathMatch:'full', redirectTo: '' }
  { path: 'news', component: NewsPageComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
