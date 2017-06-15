import { Component, OnInit } from '@angular/core';
import { CommunicateService } from '../../../../../services/group2/communicate.service';
import { Subscription }   from 'rxjs/Subscription';
import { Router }  from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    private communicate: CommunicateService,
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }

  match: Object;
  subscription: Subscription;

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.subscription = this.communicate.getMatch$.subscribe(match => {
      this.match = match;
      this.slimLoadingBarService.complete();
    });
  }

  getImageHero(name) {
    return 'http://cdn.dota2.com/apps/dota2/images/heroes/' + name + '_sb.png';
  }

  getTime(time: number) {
    if(time < 0){
      return 'Pre-start';
    }
    let min = Math.floor(time / 60);
    let sec = time % 60;
    let sec_str: String;
    if (sec < 10) {
      sec_str = '0' + sec;
    } else {
      sec_str = '' + sec;
    }
    return min + ':' + sec_str;
  }

  getClass(slot){
    if(slot < 5){
      return 'radiant';
    } else if(slot < 10){
      return 'dire';
    }
    return 'admin'
  }

  getMsg(slot,name,msg){
    if(slot >= 10){
      return name + ' says " '+msg+' "';
    }
    return msg
  }

}
