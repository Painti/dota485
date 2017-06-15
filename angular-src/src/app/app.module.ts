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
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ConfigService } from './services/config.service';
import { GetApiService } from './services/get-api.service';
import { PassJsonService } from './services/group2/pass-json.service'

import { FilterPipe } from './pipes/filter.pipe';
import { NgForObjectPipe } from './pipes/ng-for-object.pipe';

// Components group1
import { HomeComponent } from './components/group1/home/home.component';
import { HeroComponent } from './components/group1/hero/hero.component';
import { MmrComponent } from './components/group1/mmr/mmr.component';
import { ItemComponent } from './components/group1/item/item.component';
import { QuizComponent } from './components/group1/quiz/quiz.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

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
import { HeroDetailComponent } from './components/group1/hero/hero-detail/hero-detail.component';

import { BenchmarksComponent } from './components/group2/match/match-detail/benchmarks/benchmarks.component';
import { PerformancesComponent } from './components/group2/match/match-detail/performances/performances.component';
import { CombatComponent } from './components/group2/match/match-detail/combat/combat.component';
import { FarmComponent } from './components/group2/match/match-detail/farm/farm.component';
import { ChatComponent } from './components/group2/match/match-detail/chat/chat.component';
import { MatchDetailNavComponent } from './components/group2/match/match-detail/match-detail-nav/match-detail-nav.component';
import { ItemDetailComponent } from './components/group1/item/item-detail/item-detail.component';
import { HeroesPlayerComponent } from './components/group2/profile/heroes-player/heroes-player.component';
import { MatchesPlayerComponent } from './components/group2/profile/matches-player/matches-player.component';
import { OverviewPlayerComponent } from './components/group2/profile/overview-player/overview-player.component';
import { NavbarPlayerComponent } from './components/group2/profile/navbar-player/navbar-player.component';
import { PeersPlayerComponent } from './components/group2/profile/peers-player/peers-player.component';
import { OverviewTableComponent } from './components/group2/match/match-detail/overview/overview-table/overview-table.component';
import { BenchmarksTableComponent } from './components/group2/match/match-detail/benchmarks/benchmarks-table/benchmarks-table.component';
import { PerformanceTableComponent } from './components/group2/match/match-detail/performances/performance-table/performance-table.component';
import { TotalsPlayerComponent } from './components/group2/profile/totals-player/totals-player.component';
import { FarmTableComponent } from './components/group2/match/match-detail/farm/farm-table/farm-table.component';

import { CeiboShare } from 'ng2-social-share';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { HerostatComponent } from './components/group1/hero/herostat/herostat.component';
import { HerostatdetailComponent } from './components/group1/hero/herostat/herostatdetail/herostatdetail.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hero', component: HeroComponent },
  { path: 'herostat', component: HerostatComponent },
  { path: 'herostat/:hero_name', component: HerostatdetailComponent },
  { path: 'hero/:hero_name', component: HeroDetailComponent },
  { path: 'item', component: ItemComponent },
  { path: 'item/:item_name', component: ItemDetailComponent },
  { path: 'ranking', component: MmrComponent },
  { path: 'login', component: LoginComponent , canActivate: [LoginGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },

  { path: 'match', component: MatchComponent },
  {
    path: 'match/:match_id', component: MatchDetailComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: 'benchmarks', component: BenchmarksComponent },
      { path: 'performances', component: PerformancesComponent },
      { path: 'combat', component: CombatComponent },
      { path: 'farm', component: FarmComponent },
      { path: 'chat', component: ChatComponent }
    ]
  },
  { path: 'profile/setting', component: ProfileSettingComponent, canActivate: [AuthGuard] },
  { path: 'profile/setting/link-facebook', component: LinkFacebookComponent, canActivate: [AuthGuard, LinkFacebookGuard] },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] ,
    children:[
      { path: '', component: OverviewPlayerComponent },
      { path: 'heroes', component: HeroesPlayerComponent },
      { path: 'matches', component: MatchesPlayerComponent },
      { path: 'peers', component: PeersPlayerComponent },
      { path: 'totals', component: TotalsPlayerComponent }
    ]
  }
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
    OverviewComponent,
    NgForObjectPipe,
    HeroDetailComponent,
    HeroDetailComponent,
    QuizComponent,
    BenchmarksComponent,
    PerformancesComponent,
    CombatComponent,
    FarmComponent,
    ChatComponent,
    MatchDetailNavComponent,
    ItemDetailComponent,
    MatchDetailNavComponent,
    OverviewPlayerComponent,
    HeroesPlayerComponent,
    MatchesPlayerComponent,
    NavbarPlayerComponent,
    PeersPlayerComponent,
    OverviewTableComponent,
    BenchmarksTableComponent,
    PerformanceTableComponent,
    TotalsPlayerComponent,
    FarmTableComponent,
    CeiboShare,
    HerostatComponent,
    HerostatComponent,
    HerostatdetailComponent
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
    ModalModule.forRoot(),
    ChartModule,
    PopoverModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    ConfigService,
    GetApiService,
    CommunicateService,
    AuthService,
    AuthGuard,
    LoginGuard,
    LinkFacebookGuard,
    PassJsonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
