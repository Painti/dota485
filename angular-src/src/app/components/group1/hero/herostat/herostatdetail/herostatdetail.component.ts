import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-herostatdetail',
  templateUrl: './herostatdetail.component.html',
  styleUrls: ['./herostatdetail.component.css']
})
export class HerostatdetailComponent implements OnInit {

  constructor(
  private route: ActivatedRoute,private api: GetApiService
  ){ }
  heroesStat:Array<Object>
  id:string
  ngOnInit() {
    this.route.params.subscribe(params =>{
            this.id = params['hero_name'];
            this.api.getHeroesStat().subscribe(data => {
              this.heroesStat = data[this.id];
            },
              err => {
                console.log(err);
                return false;

              });

    });
  }

}
