import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Components group1
import { HomeComponent } from './components/group1/home/home.component';
import { HeroComponent } from './components/group1/hero/hero.component';

// Components group2
import { LoginComponent } from './components/group2/login/login.component';
import { MatchComponent } from './components/group2/match/match.component';
import { ProfileComponent } from './components/group2/profile/profile.component';
import { AuthService } from './services/group2/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hero', component: HeroComponent },
  { path: 'login', component: LoginComponent , canActivate: [LoginGuard]},
  { path: 'match', component: MatchComponent },
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HeroComponent,
    MatchComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
