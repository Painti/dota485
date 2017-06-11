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
temp:number;

upgrade:Array<any>

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.name = params['item_name'];
        //console.log(this.name)
        this.api.getItem().subscribe(data =>{
            this.detail = data.itemdata[this.name];
            this.cost = data.itemdata[this.name].cost;
            this.items = data;

            this.p = 0;
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
}
