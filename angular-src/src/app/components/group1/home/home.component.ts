import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api.service';
import { AuthService } from '../../../services/group2/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForObjectPipe } from '../../../pipes/ng-for-object.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api: GetApiService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router:Router) { }

  unique:any;
  status: any;
  item:Object;
  hero:Object;
  key: string;
  searching : boolean;
  show1 : boolean;
  show2 : boolean;

  s_item:Array<any>;
  s_hero:Array<any>;
  player: any;
  match : any;

  ngOnInit() {
    this.searching = false;
    this.show1 = false;
    this.show2 = false;

    this.api.getUnique().subscribe(data => {
      this.unique = data["users_last_month"];
    },
    err => {
      console.log(err);
      return false;
    });

    this.api.getStatus().subscribe(data => {
      this.status = data["user_players"];
    },
    err => {
      console.log(err);
      return false;
    });

    this.api.getHeroesList().subscribe(data => {
      this.hero = data["herodata"];
    },
    err => {
      console.log(err);
      return false;
    });

    this.api.getItem().subscribe(data =>{
      this.item = data.itemdata;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onSearch(){
    this.show1 = false;
    this.show2 = false;


    if(this.key === undefined || this.key ==''){
      return ;
    }
    let word = this.key.trim().toLowerCase();
    this.searching = true;

    var reg = /^\d+$/;
    if(!reg.test(word)){
      this.s_item = [];
      for (let key in this.item) {
        if(this.item[key].dname.search(word) >= 0 && this.basicNotUse(key)=='YES' && this.upgradeNotUse(key)=='YES'){
          let tmp = this.item[key];
          tmp['prop'] = key;
          this.s_item.push(tmp);
        }
      }

      this.s_hero = [];
      for (let key in this.hero) {
        if(this.hero[key].dname.toLowerCase().search(word) >= 0){
          let tmp = this.hero[key];
          tmp['prop'] = key;
          this.s_hero.push(tmp);
        }
      }
      this.searching = false;
      this.show1 = true;

    } else {
      this.s_item = null;
      this.s_hero = null;
      this.match = null;
      this.api.getOpendata('/matches/'+word).subscribe(data => {
        if(!data.status){
          this.match = {match_id: null};
        } else {
          this.match = data;
        }
      });

      this.player = null;
      this.auth.getProfile_Player(word).subscribe(data => {
        if(data.tracked_until == null){
          this.player = {profile: {account_id: null}};
        } else {
          this.player = data;
        }
      });

      this.show2 = true;
    }
  }

  getImageItemLg(name){
    return 'http://cdn.dota2.com/apps/dota2/images/items/'+name+'_lg.png';
  }

  getImageHero(name){
    return 'http://cdn.dota2.com/apps/dota2/images/heroes/'+name+'_lg.png';
  }

  gotodetial(name) {
    this.router.navigate(['/hero', name]);
  }

  itemDetail(name){
    this.router.navigate(['/item', name]);
  }

  upgradeNotUse(name){
    if(name!=='dagon_2' && name!=='dagon_3' && name!=='dagon_4' && name!=='dagon_5' && name!=='necronomicon_2' && name!=='necronomicon_3' && name!=='diffusal_blade_2' && name!=='travel_boots_2')
    {
      return 'YES';
    }
  }

  basicNotUse(name){
    if(name!=='river_painter' && name!=='river_painter2' && name!=='river_painter3' && name!=='river_painter4' && name!=='river_painter5' && name!=='river_painter6' && name!=='river_painter7')
    {
      return 'YES';
    }
  }
}
