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
import { MmrComponent } from './components/group1/mmr/mmr.component';
import { ItemComponent } from './components/group1/item/item.component';

// Components group2
import { LoginComponent } from './components/group2/login/login.component';
import { MatchComponent } from './components/group2/match/match.component';
import { MatchDetailComponent } from './components/group2/match/match-detail/match-detail.component';
import { ProfileComponent } from './components/group2/profile/profile.component';
import { ProfileSettingComponent } from './components/group2/profile/profile-setting/profile-setting.component';
import { AuthService } from './services/group2/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hero', component: HeroComponent },
  { path: 'item', component: ItemComponent },
  { path: 'ranking', component: MmrComponent },
  { path: 'login', component: LoginComponent , canActivate: [LoginGuard]},
  { path: 'match', component: MatchComponent },
  { path: 'match/:match_id', component: MatchDetailComponent },
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]},
  { path: 'profile/setting', component: ProfileSettingComponent , canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HeroComponent,
    MatchComponent,
    MatchDetailComponent,
    ProfileComponent,
    LoginComponent,
    ProfileSettingComponent,
    MmrComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
