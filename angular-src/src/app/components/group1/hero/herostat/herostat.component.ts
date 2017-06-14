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
  ) { }
  stat:Array<Object>;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.api.getHeroesStat().subscribe(data => {
        this.stat = data;
      },
        err => {
          console.log(err);
          return false;
        });
    })
  }

}
