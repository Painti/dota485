import { Component, OnInit } from '@angular/core';
import { CommunicateService } from '../../../../../services/group2/communicate.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css']
})
export class CombatComponent implements OnInit {

  constructor(private communicate: CommunicateService) { }

  match: Object;
  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.communicate.getMatch$.subscribe(match => {
      this.match = match;
    });
  }

  getImageHero(name) {
    return 'http://cdn.dota2.com/apps/dota2/images/heroes/' + name + '_sb.png';
  }

  getBar(type, num1, num2){
    let total = num1 + num2;
    if(total == 0){
      return '0%';
    }
    if(type == "radiant"){
      return num1*100/total+'%';
    } else if(type == "dire"){
      return num2*100/total+'%';
    }
    return '0%';
  }

  getCombat(num1, num2){
    let tag = '<span class="text-success ';
    let tag1 = '<span class="text-danger ';
    let tag2 = '</span>';
    if(num1 > num2){
      tag += "very-bold";
    } else if(num2 > num1){
      tag1 += "very-bold";
    }
    tag += '">';
    tag1 += '">';
    return tag+num1+tag2+' - '+tag1+num2+tag2;
  }

  getHeroName(name){
    name = name.replace("_"," ");
    return name.charAt(0).toUpperCase()+name.slice(1);
  }

}
