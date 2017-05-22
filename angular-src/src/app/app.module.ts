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

import { FilterPipe } from './pipes/filter.pipe';
import { NgForObjectPipe } from './pipes/ng-for-object.pipe';

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
import { HeroDetailComponent } from './components/group1/hero/hero-detail/hero-detail.component';
import { QuizComponent } from './components/group1/quiz/quiz.component';
import { BenchmarksComponent } from './components/group2/match/match-detail/benchmarks/benchmarks.component';
import { PerformancesComponent } from './components/group2/match/match-detail/performances/performances.component';
import { CombatComponent } from './components/group2/match/match-detail/combat/combat.component';
import { FarmComponent } from './components/group2/match/match-detail/farm/farm.component';
import { PurchaseComponent } from './components/group2/match/match-detail/purchase/purchase.component';
import { GraphComponent } from './components/group2/match/match-detail/graph/graph.component';
import { CastComponent } from './components/group2/match/match-detail/cast/cast.component';
import { ObjectivesComponent } from './components/group2/match/match-detail/objectives/objectives.component';
import { VisionComponent } from './components/group2/match/match-detail/vision/vision.component';
import { ActionComponent } from './components/group2/match/match-detail/action/action.component';
import { TeamfightsComponent } from './components/group2/match/match-detail/teamfights/teamfights.component';
import { LogComponent } from './components/group2/match/match-detail/log/log.component';
import { ChatComponent } from './components/group2/match/match-detail/chat/chat.component';
import { StoryComponent } from './components/group2/match/match-detail/story/story.component';
import { MatchDetailNavComponent } from './components/group2/match/match-detail/match-detail-nav/match-detail-nav.component';
import { ItemDetailComponent } from './components/group1/item/item-detail/item-detail.component';
import { HeroesPlayerComponent } from './components/group2/profile/heroes-player/heroes-player.component';
import { MatchesPlayerComponent } from './components/group2/profile/matches-player/matches-player.component';
import { OverviewPlayerComponent } from './components/group2/profile/overview-player/overview-player.component';
import { NavbarPlayerComponent } from './components/group2/profile/navbar-player/navbar-player.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hero', component: HeroComponent },
  { path: 'hero/:hero_name', component: HeroDetailComponent },
  { path: 'item', component: ItemComponent },
  { path: 'item/:item_name', component: ItemDetailComponent },
  { path: 'ranking', component: MmrComponent },
  { path: 'quiz', component: QuizComponent }  ,
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
      { path: 'purchase', component: PurchaseComponent },
      { path: 'graph', component: GraphComponent },
      { path: 'cast', component: CastComponent },
      { path: 'objectives', component: ObjectivesComponent },
      { path: 'vision', component: VisionComponent },
      { path: 'action', component: ActionComponent },
      { path: 'teamfights', component: TeamfightsComponent },
      { path: 'log', component: LogComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'story', component: StoryComponent }
    ]
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] ,
    children:[
      { path: '', component: OverviewPlayerComponent },
      { path: 'heroes', component: HeroesPlayerComponent },
      { path: 'matches', component: MatchesPlayerComponent }
    ]
  },
  { path: 'profile/setting', component: ProfileSettingComponent, canActivate: [AuthGuard] },
  { path: 'profile/setting/link-facebook', component: LinkFacebookComponent, canActivate: [AuthGuard, LinkFacebookGuard] }
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
    PurchaseComponent,
    GraphComponent,
    CastComponent,
    ObjectivesComponent,
    VisionComponent,
    ActionComponent,
    TeamfightsComponent,
    LogComponent,
    ChatComponent,
    StoryComponent,
    MatchDetailNavComponent,
    ItemDetailComponent,
    MatchDetailNavComponent,
    OverviewPlayerComponent,
    HeroesPlayerComponent,
    MatchesPlayerComponent,
    NavbarPlayerComponent
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
    ChartModule,
    PopoverModule.forRoot()
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
