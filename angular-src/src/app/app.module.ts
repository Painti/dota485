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
import { MatchComponent } from './components/group2/match/match.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hero', component: HeroComponent },
  { path: 'match', component: MatchComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HeroComponent,
    MatchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
