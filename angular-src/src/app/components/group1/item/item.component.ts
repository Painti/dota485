import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForObjectPipe } from '../../../pipes/ng-for-object.pipe';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(
    private api: GetApiService,
    private route: ActivatedRoute,
    private router:Router,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }

  item:Object;

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.api.getItem().subscribe(data =>{
      this.item = data;
      this.slimLoadingBarService.complete();
    },
    err => {
      console.log(err);
      return false;
    });
  }

  getImage(name){
    return "http://cdn.dota2.com/apps/dota2/images/items/"+name+"_lg.png"
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
