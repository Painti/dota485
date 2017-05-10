import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetApiService {

  constructor(private http:Http) { }

  getOpendata(url){
    return this.http.get('https://api.opendota.com/api/'+url)
      .map(res => res.json());
  }

  //API mmr ranking
  getMMRData(){
    return this.http.get('http://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1?key=D66F1513084C6633AC47944E35FF8203')
      .map(res => res.json());
  }

  getHero(){
    return this.http.get('http://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1?key=D66F1513084C6633AC47944E35FF8203')
      .map(res => res.json());
  }

}
