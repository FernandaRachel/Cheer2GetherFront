import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
<<<<<<< HEAD
import { CommunityComponent } from './pages/community/community.component';

=======
import { AuthGuardService } from './auth/auth.guard';
>>>>>>> cc85278cb7e98bf3bd98209e6bdc6bac4f63234b

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main-page', component: MainPageComponent, canActivate: [AuthGuardService] },
  // { path: '**', pathMatch:'full', redirectTo: '' }
  { path: 'community', component: CommunityComponent},
  { path: 'news', component: NewsPageComponent, canActivate: [AuthGuardService]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
