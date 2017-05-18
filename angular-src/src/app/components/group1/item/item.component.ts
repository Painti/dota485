import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForObjectPipe } from '../../../pipes/ng-for-object.pipe';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(
    private api: GetApiService,
    private route: ActivatedRoute
  ) { }

  item:Object;


  ngOnInit() {
    this.api.getItem().subscribe(data =>{
      this.item = data;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  getName(name){
    return name.replace("item_", "");
  }

  getImage(name){
    return "http://cdn.dota2.com/apps/dota2/images/items/"+name+"_lg.png"
  }

  getDescription(desc){
    return desc.replace(/<br [/]>/g, " ");
  }
}
