import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FilterPipe } from '../../../../pipes/filter.pipe';

@Component({
  selector: 'app-herostat',
  templateUrl: './herostat.component.html',
  styleUrls: ['./herostat.component.css']
})
export class HerostatComponent implements OnInit {

  constructor(
    private api: GetApiService,
    private route: ActivatedRoute,
    private router:Router
  ) { }
  stat:Array<Object>;
  stat2:Array<number>;
  order: Object = { name:String, pb: String };
  arrfilter: Array<String>;

  sum:number;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.api.getHeroesStat().subscribe(data => {
        this.stat = data;
        this.stat2 = [];
        this.sum = 0;
        for (let i = 0; i < this.stat.length; i++) {
          if (this.stat[i]['pro_win']===undefined) {
            this.stat[i]['pro_win']=0;
          }
          else if(this.stat[i]['pro_win']!==undefined){
            this.sum += this.stat[i]['pro_win'];
          }

          if (this.stat[i]['pro_ban']===undefined) {
            this.stat[i]['pro_ban']=0;
          }
          else if(this.stat[i]['pro_ban']!==undefined){
            this.sum += this.stat[i]['pro_ban'];
          }

          if (this.stat[i]['pro_pick']===undefined) {
            this.stat[i]['pro_pick']=0;
          }
          else if(this.stat[i]['pro_pick']!==undefined){
            this.sum += this.stat[i]['pro_pick'];
          }
          if (this.stat[i]['pro_pick']+this.stat[i]['pro_ban']===undefined) {
            this.stat[i]['pro_pick']+this.stat[i]['pro_ban']==0;
            this.stat2.push(this.stat[i]['pro_pick']+this.stat[i]['pro_ban'])
          }
          else if(this.stat[i]['pro_pick']+this.stat[i]['pro_ban']!==undefined){
            this.sum += this.stat[i]['pro_pick']+this.stat[i]['pro_ban'];
            this.stat2.push(this.stat[i]['pro_pick']+this.stat[i]['pro_ban'])
          }
          //console.log(this.stat2[i]);
        }
        this.sum = this.sum/10;
      },
        err => {
          console.log(err);
          return false;
        });
    })

    this.initOrder();
  }
  getImage(hName) {
      return "http://cdn.dota2.com/apps/dota2/images/heroes/" + this.getHeroName(hName) + "_sb.png"
  }
  getHeroName(hName){
    hName = hName.replace("npc_dota_hero_","");
    return hName;
  }
  getClass(num){
    num *= 100;
    if(num >= 70){
      return 'bg-success';
    } else if(num >= 40){
      return 'bg-warning';
    } else {
      return 'bg-danger';
    }
  }
  gotodetial(name) {
    this.router.navigate(['/hero', name]);
  }

  initOrder() {
    this.order = {
      'name': 'desc',
      'pro_pb': '',
      'pro_pick': '',
      'pro_ban': '',
      'pro_win': ''
    };
    this.arrfilter = ['-name'];
  }

  switchAsc(prop: string) {
    let x = this.order[prop];
    this.order['name'] = '';
    this.order['pro_pb'] = '';
    this.order['pro_pick'] = '';
    this.order['pro_ban'] = '';
    this.order['pro_win'] = '';
    if (x == 'asc') {
      this.order[prop] = 'desc';
      this.arrfilter = ['-' + prop];
    } else if (x == 'desc') {
      this.order[prop] = 'asc';
      this.arrfilter = ['+' + prop];
    } else {
      this.order[prop] = 'asc';
      this.arrfilter = ['+' + prop];
    }
  }
}
