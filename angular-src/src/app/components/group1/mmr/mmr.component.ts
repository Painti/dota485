import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-mmr',
  templateUrl: './mmr.component.html',
  styleUrls: ['./mmr.component.css']
})
export class MmrComponent implements OnInit {

  constructor(
    private api: GetApiService,
    private route: ActivatedRoute
  ) { }
    rankingEU:Object
    rankingA:Array<Object>
    rankingSE:Array<Object>
    rankingCH:Array<Object>

  ngOnInit() {
    this.api.getMMRData('americas').subscribe( data => {
      this.rankingA = data;
    },
     err => {
       console.log(err);
       return false;
     });

     this.api.getMMRData('europe').subscribe( data => {
       this.rankingEU = data;
     },
      err => {
        console.log(err);
        return false;
      });

      this.api.getMMRData('se_asia').subscribe( data => {
        this.rankingSE = data;
      },
       err => {
         console.log(err);
         return false;
       });

       this.api.getMMRData('china').subscribe( data => {
         this.rankingCH = data;
       },
        err => {
          console.log(err);
          return false;
        });



  }



  getImageFlag(flag) {
    let msg = 'http://community.edgecast.steamstatic.com/public/images/countryflags/' + flag + '.gif';
    if(flag != null){
      return msg;
    }
  }

}
