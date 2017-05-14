import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartModule } from 'angular2-chartjs';

import { ConfigService } from './services/config.service';
import { GetApiService } from './services/get-api.service';

import { FilterPipe } from './pipes/filter.pipe';

// Components group1
import { HomeComponent } from './components/group1/home/home.component';
import { HeroComponent } from './components/group1/hero/hero.component';
import { MmrComponent } from './components/group1/mmr/mmr.component';
import { ItemComponent } from './components/group1/item/item.component';

// Components group2
import { LoginComponent } from './components/group2/login/login.component';
import { MatchComponent } from './components/group2/match/match.component';
import { MatchDetailComponent } from './components/group2/match/match-detail/match-detail.component';
import { CommunicateService } from './services/group2/communicate.service';
import { OverviewComponent } from './components/group2/match/match-detail/overview/overview.component';
import { ProfileComponent } from './components/group2/profile/profile.component';
import { ProfileSettingComponent } from './components/group2/profile/profile-setting/profile-setting.component';
import { AuthService } from './services/group2/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';
import { LinkFacebookGuard } from './guard/linkfacebook.guard';
import { LinkFacebookComponent } from './components/group2/profile/profile-setting/link-facebook/link-facebook.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hero', component: HeroComponent },
  { path: 'item', component: ItemComponent },
  { path: 'ranking', component: MmrComponent },
  { path: 'login', component: LoginComponent , canActivate: [LoginGuard]},
  { path: 'match', component: MatchComponent },
  { path: 'match/:match_id', component: MatchDetailComponent,
    children: [
        { path: '', component: OverviewComponent }
    ]
  },
  { path: 'match/:match_id/overview', component: OverviewComponent },
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]},
  { path: 'profile/setting', component: ProfileSettingComponent , canActivate: [AuthGuard]},
  { path: 'profile/setting/link-facebook', component: LinkFacebookComponent , canActivate: [AuthGuard, LinkFacebookGuard]}
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
    ItemComponent,
    LinkFacebookComponent,
    FilterPipe,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    ChartModule
  ],
  providers: [
    ConfigService,
    GetApiService,
    CommunicateService,
    AuthService,
    AuthGuard,
    LoginGuard,
    LinkFacebookGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
