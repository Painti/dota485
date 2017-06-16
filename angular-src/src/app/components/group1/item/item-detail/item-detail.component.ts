import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForObjectPipe } from '../../../../pipes/ng-for-object.pipe';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  constructor(
    private api: GetApiService,
    private route: ActivatedRoute,
    private router:Router,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }

detail:Object;
items:Object;
name:string;

p:number;
cost:number;

s:string;
itemup:Array<string>;
itemcom:Array<string>;

    ngOnInit() {
      this.slimLoadingBarService.start();
      this.route.params.subscribe(params => {
        this.name = params['item_name'];
        //console.log(this.name)
        this.api.getItem().subscribe(data =>{
            this.detail = data.itemdata[this.name];
            this.cost = data.itemdata[this.name].cost;
            this.items = data;

            this.itemcom=[];
            this.p = 0;
            if(data.itemdata[this.name].components !== null){
              for(let key of data.itemdata[this.name].components){
                this.p = this.p + data.itemdata[key].cost;
                this.itemcom.push(key);
              }
            }

            this.s='';
              this.itemup=[];
              for(let key in data.itemdata){
                if(data.itemdata[key].components !== null){
                  for(let key1 of data.itemdata[key].components){
                    if(this.name==key1){
                      if(this.s!=key){
                        this.itemup.push(key);
                        this.s=key;
                      }
                  }
                }
              }
            }
            this.slimLoadingBarService.complete();
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
    return "http://cdn.dota2.com/apps/dota2/images/items/"+name+"_lg.png";
  }

  getImage(){
    return "http://cdn.dota2.com/apps/dota2/images/items/"+this.name+"_lg.png";
  }

  getDesc(desc:string){
    let des = desc.replace(/<br [/]>/g, " ");
    return des.replace(/[+%]/g, "");
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
      return 'YES';
    }
    else{
      return 'NO';
    }
  }
}
