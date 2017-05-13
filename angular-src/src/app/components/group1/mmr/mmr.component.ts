import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-mmr',
  templateUrl: './mmr.component.html',
  styleUrls: ['./mmr.component.css']
})
export class MmrComponent implements OnInit {

  constructor(
    private api: GetApiService,
    private route: ActivatedRoute
  ) { }
    ranking:Object

  ngOnInit() {
    this.api.getMMRData().subscribe( data => {
      this.ranking = data;
    },
     err => {
       console.log(err);
       return false;
     });

  }

  initOrder() {
  }

}
