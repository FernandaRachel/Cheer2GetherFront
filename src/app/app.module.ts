import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialLoginModule, AuthServiceConfig, AuthService } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CommunityComponent } from './pages/community/community.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { JwtModule, JwtModuleOptions, JwtHelperService } from '@auth0/angular-jwt';
import { SocketService } from './shared/service/socket.service';
import { FooterComponent } from './components/footer/footer.component';



const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('320671691982969')
  },
]);



export function tokenGetter() {
  console.log('tokenGetter');

  debugger
  const helper = new JwtHelperService();
  const token = localStorage.getItem('user');
  const decodedToken = helper.decodeToken(token);
  const expirationDate = helper.getTokenExpirationDate(token);
  const isExpired = helper.isTokenExpired(token);
  return token;
}

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CarouselComponent,
    HeaderComponent,
    DashboardCardComponent,
    NewsPageComponent,
    MainPageComponent,
    CommunityComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    SocialLoginModule,
    NgxWebstorageModule.forRoot(),
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     whitelistedDomains: ['localhost:4200'],
    //   }
    // })
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    SocketService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
