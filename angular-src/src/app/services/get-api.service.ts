import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConfigService } from './config.service';

@Injectable()
export class GetApiService {

  constructor(private http:Http, private config:ConfigService) { }

  //Group2
  getOpendata(url){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/opendota/'+url)
      .map(res => res.json());
  }

  getRequestMatch(id){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/opendota/getreq/'+id)
      .map(res => res.json());
  }

  postRequestMatch(id){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/opendota/postreq/'+id)
      .map(res => res.json());
  }


  //Group1
  //API mmr ranking
  getMMRData(){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/mmr')
      .map(res => res.json());
  }

  getHero(){
    return this.http.get('http://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1?key=D66F1513084C6633AC47944E35FF8203')
      .map(res => res.json());
  }

}
