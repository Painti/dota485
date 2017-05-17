import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GetApiService {

  constructor(private http:Http, private config:ConfigService) { }

  //Group2
  getOpendata(url){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/opendota/'+url)
      .map(res => res.json());
  }

  getRequestMatch(id, obj){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/opendota/getreq/'+id)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
      .flatMap(result => {
          if(result.progress > 1){
            let start = Date.now();
            let now = start;
            while (now - start < 3000) {
              now = Date.now();
            }
          }
          obj.o = result;
          if(result.state == 'failed' || result.state == 'completed' )
            return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/opendota/getreq/'+id)
              .map(res => res.json());
          else
            return this.getRequestMatch(id, obj);
      });
  }

  postRequestMatch(id){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/opendota/postreq/'+id)
      .map(res => res.json());
  }


  //Group1
  //API mmr ranking
  getMMRData(server){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/mmr/'+server)
      .map(res => res.json());
  }

  getHero(){
    return this.http.get('http://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1?key=D66F1513084C6633AC47944E35FF8203')
      .map(res => res.json());
  }

  getProfile(){
    return this.http.get('https://api.opendota.com/api/players/193605174')
      .map(res => res.json());
  }

  getRecentMatch(){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/recentMatch/')
      .map(res => res.json());
  }

  getWinAndLose(){
    return this.http.get('https://api.opendota.com/api/players/193605174/wl')
      .map(res => res.json());
  }

  getHeroes(){
    return this.http.get('https://api.opendota.com/api/players/193605174/heroes')
      .map(res => res.json());
  }

  getPeer(){
    return this.http.get('https://api.opendota.com/api/players/193605174/peers')
      .map(res => res.json());
  }

  getItem(){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/items/')
      .map(res => res.json())
  }

  getRareItem(){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/items/')
      .map(res => res.json())
  }

}
