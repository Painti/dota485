import { Component, OnInit } from '@angular/core';
import { CommunicateService } from '../../../../../services/group2/communicate.service';
import { Subscription }   from 'rxjs/Subscription';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-benchmarks',
  templateUrl: './benchmarks.component.html',
  styleUrls: ['./benchmarks.component.css']
})
export class BenchmarksComponent implements OnInit {

  constructor(
    private communicate: CommunicateService,
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

}
