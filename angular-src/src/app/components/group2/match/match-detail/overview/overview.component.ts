import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunicateService } from '../../../../../services/group2/communicate.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {

  constructor(private communicate: CommunicateService) { }

  match: Object;
  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.communicate.getMatch$.subscribe(
      match => {
        this.match = match;
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
