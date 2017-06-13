import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForObjectPipe } from '../../../pipes/ng-for-object.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api: GetApiService,
  private route: ActivatedRoute,
  private router:Router) { }

  item:Object;
  hero:Object;

  ngOnInit() {
    this.api.getHeroesList().subscribe(data => {
      this.hero = data["herodata"];
    },
      err => {
        console.log(err);
        return false;
      });

      this.api.getItem().subscribe(data =>{
        this.item = data;
      },
      err => {
        console.log(err);
        return false;
      });
  }

  itemDetail(name){
    this.router.navigate(['/item', name]);
  }

  gotodetial(name) {
    this.router.navigate(['/hero', name]);
  }

}
