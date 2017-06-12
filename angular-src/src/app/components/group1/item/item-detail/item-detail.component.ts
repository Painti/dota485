import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForObjectPipe } from '../../../../pipes/ng-for-object.pipe';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  constructor(
    private api: GetApiService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

detail:Object;
items:Object;
name:string;

p:number;
cost:number;

s:any;
c:string;

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.name = params['item_name'];
        //console.log(this.name)
        this.api.getItem().subscribe(data =>{
            this.detail = data.itemdata[this.name];
            this.cost = data.itemdata[this.name].cost;
            this.items = data;

            this.p = 0;
            this.c = 'NO';
            if(data.itemdata[this.name].components !== null){
              for(let key of data.itemdata[this.name].components)
                this.p = this.p + data.itemdata[key].cost;
            }
      },
        err => {
          console.log(err);
          return false;
        });
      });

    }

  itemDetail(name){
    this.router.navigate(['/item', name]);
  }

  getComponents(name){//recipe
    return "http://cdn.dota2.com/apps/dota2/images/items/"+name+"_lg.png"
  }

  getImage(){
    return "http://cdn.dota2.com/apps/dota2/images/items/"+this.name+"_lg.png"
  }

  getDesc(desc){
    return desc.replace(/<br [/]>/g, " ");
  }

  getNameComponent(name){
    return name.replace(/_/g, " ");
  }

  getPrice(){
    let r = 0;
    r= this.cost;
    let sum = 0;

    sum = this.cost - this.p;
    r = r - sum;

    if(r == 0 || sum==0){
      return 'YES';
    }
    else if(r > 0 && sum>0){
      return 'NO';
    }
  }

  watchUpgrade(name){
    if(name=='dagon_2' || name=='necronomicon_2' || name=='diffusal_blade_2' || name=='travel_boots_2'){
      return 'YES'
    }
  }
/*
  getUpgrade(compo){
    if(this.c=='NO' && this.s!=undefined){
      if(compo == this.s){
        this.c = 'YES';
          return this.c;
      }
      if(compo != this.s){
        this.c = 'NO';
        this.s = compo;
          return this.c;
      }
    }
    else if(this.c=='YES'){

      if(compo !== this.s){
        this.c = 'NO';
        this.s = compo;
          return this.c;
      }
    }

    if(this.s==undefined){
      this.s= compo;
        return this.c;
    }
  }*/
/*
  equals(name){
    if(name=='ring_of_aquila' || name=='ward_dispenser' || name=='urn_of_shadows' || name=='null_talisman' || name=='magic_wand' ||
    name=='ethereal_blade' || name=='soul_ring'|| name=='bloodstone' || name=='guardian_greaves' || name=='bloodthorn' ||
    name=='hurricane_pike'|| name=='pipe' || name=='abyssal_blade' || name=='silver_edge' || name=='mjollnir' || name=='solar_crest'){
      return 'YES';
    }
  }*/
/*
  getUpadeName(upgrade,name){
    if((upgrade == 'orb_of_venom' && name =='orb_of_venom') ||(upgrade=='sange_and_yasha' && name=='sange_and_yasha') || (upgrade=='sange' && name=='sange' ) ||
     (upgrade=='yasha' && name=='yasha')){
      return 'YES';
    }
  }*/


}
