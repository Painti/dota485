import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { ConfigService } from '../config.service';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http, private config:ConfigService) { }

  authenticateUser(){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/auth/steam/authenticate', {withCredentials: true})
      .map(res => res.json());
  }

  linkFacebook(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/auth/facebook/authenticate', {withCredentials: true})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/auth/steam/profile', {headers: headers})
      .map(res => res.json());
  }

  isLinkedFacebook(){
    let x = true;
    this.getProfile().subscribe(data => {
      if(data.user.facebook !== undefined){
        x = false;
      }
    });
    return x;
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    let token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getHero(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/profile/'+ id +'/heroes'  )
      .map(res => res.json());
  }

  getHero_Stats(){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/profile/hero_stats'  )
      .map(res => res.json());
  }

  getProfile_Player(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/profile/' + id +'/profile_player')
      .map(res => res.json());
  }

  getRecentMatch(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/profile/' + id +'/recentMatch')
      .map(res => res.json());

  }

  getWinAndLose(id){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/profile/'+ id +'/wl')
      .map(res => res.json());
  }

  getPeer(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/profile/' + id+'/peers')
      .map(res => res.json());
  }

  getTotals(id){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/profile/' +id+'/totals')
      .map(res => res.json());
  }

}
