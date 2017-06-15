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
  sum:number;
  arrfilter: Array<String>;
  order: Object = { pro_pb: String, pro_p: String, pro_b: String, pro_w: String };
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.api.getHeroesStat().subscribe(data => {
        this.stat = data;
        this.sum = 0;
        for (let i = 0; i < this.stat.length; i++) {
          if (this.stat[i]['pro_pick']===undefined) {
            this.stat[i]['pro_pick']=0;
          }
          this.sum += this.stat[i]['pro_pick'];
        }
        this.sum = this.sum/10;
      },
        err => {
          console.log(err);
          return false;
        });
    })
  }
  initOrder() {
    this.order = {
      'pro_pb': 'desc',
      'pro_p': '',
      'pro_b': '',
      'pro_w': ''
    };
    this.arrfilter = ['-pro_pb'];
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
    this.router.navigate(['/herostat', name]);
  }

  switchAsc(prop: string) {
    let x = this.order[prop];
    this.order['pro_pb'] = '';
    this.order['pro_p'] = '';
    this.order['pro_b'] = '';
    this.order['pro_w'] = '';
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
