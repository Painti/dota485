import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetApiService {

  constructor(private http:Http) { }

  //Group2
  getOpendata(url){
    return this.http.get('https://api.opendota.com/api/'+url)
      .map(res => res.json());
  }


  //Group1
  //API mmr ranking
  getMMRData(){
    return this.http.get('http://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001?division=europe')
      .map(res => res.json());
  }

  getHero(url){
    return this.http.get('http://www.dota2.com/jsfeed/'+url)
      .map(res => res.json());
  }

}
