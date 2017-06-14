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
  getStatus(){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/status')
      .map(res => res.json());
  }

  getUnique(){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/unique')
      .map(res => res.json());
  }

  getMMRData(server){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/mmr/'+server)
      .map(res => res.json());
  }
  getHeroStat(hName){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/heroes/stat/'+hName)
      .map(res => res.json());
  }
  getHeroesStat(){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/heroes/herostat')
      .map(res => res.json());
  }
  getHeroes(){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/heroes/')
      .map(res => res.json());
  }

  getHeroesList(){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/heroes/detail')
      .map(res => res.json());
  }

  getHeroesSkills(name){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/heroes/skills/'+name)
      .map(res => res.json());
  }

  getItem(){
    return this.http.get('http://'+this.config.hostname+':'+this.config.port+'/data/items')
      .map(res => res.json())
  }

}
