import { Component, OnInit } from '@angular/core';
import { CommunicateService } from '../../../../../services/group2/communicate.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.css']
})
export class PerformancesComponent implements OnInit {

  constructor(private communicate: CommunicateService) { }

  match: Object;
  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.communicate.getMatch$.subscribe(match => {
      this.match = match;
    });
  }

}
