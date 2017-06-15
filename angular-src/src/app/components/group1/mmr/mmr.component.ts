import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-mmr',
  templateUrl: './mmr.component.html',
  styleUrls: ['./mmr.component.css']
})
export class MmrComponent implements OnInit {

  constructor(
    private api: GetApiService,
    private route: ActivatedRoute,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }
    rankingEU:Object
    rankingA:Object
    rankingSE:Object
    rankingCH:Object
    tabs: Array<String>;

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.api.getMMRData('americas').subscribe( data => {
      this.rankingA = data;
      this.slimLoadingBarService.complete();
    },
     err => {
       console.log(err);
       return false;
     });

     this.api.getMMRData('europe').subscribe( data => {
       this.rankingEU = data;
       this.slimLoadingBarService.complete();
     },
      err => {
        console.log(err);
        return false;
      });

      this.api.getMMRData('se_asia').subscribe( data => {
        this.rankingSE = data;
        this.slimLoadingBarService.complete();
      },
       err => {
         console.log(err);
         return false;
       });

       this.api.getMMRData('china').subscribe( data => {
         this.rankingCH = data;
         this.slimLoadingBarService.complete();
       },
        err => {
          console.log(err);
          return false;
        });
        this.tabs = ['active', '', '',''];



  }

  canShow(arr, num) {
    return arr && this.tabs[num] == 'active';
  }

  onTab(num) {
    this.tabs = ['', '', ''];
    this.tabs[num] = 'active';

  }

  getImageFlag(flag) {
    let msg = 'http://community.edgecast.steamstatic.com/public/images/countryflags/' + flag + '.gif';
    if(flag != null){
      return msg;
    }
  }

}
