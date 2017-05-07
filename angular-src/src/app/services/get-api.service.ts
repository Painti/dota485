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

}
