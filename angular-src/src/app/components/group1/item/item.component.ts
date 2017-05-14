import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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

  item:Array<Object>

  ngOnInit() {
    this.api.getItem().subscribe(data =>{
      this.item = data;
    },
    err => {
      console.log(err);
      return false;
    });

    this.api.getRareItem().subscribe(data =>{
      this.item = data;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
