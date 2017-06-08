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
  ) { }

detail:Object;
items:Object;
name:string;

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.name = params['item_name'];
        console.log(this.name)
        this.api.getItem().subscribe(data =>{
            this.detail = data.itemdata[this.name];
      },
        err => {
          console.log(err);
          return false;
        });
      });

      this.api.getItem().subscribe(data =>{
        this.items = data;
      },
      err => {
        console.log(err);
        return false;
      });
    }

  getComponents(name){
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
}
