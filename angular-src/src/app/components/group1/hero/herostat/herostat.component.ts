import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
}
