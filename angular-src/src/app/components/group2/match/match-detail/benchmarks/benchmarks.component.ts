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
<<<<<<< HEAD
    private slimLoadingBarService: SlimLoadingBarService
  ) { }
=======
    private slimLoadingBarservice: SlimLoadingBarService) { }
>>>>>>> 7f23607b8f3b2ea294847287a500621915faf79b

  match: Object;
  subscription: Subscription;

  ngOnInit() {
<<<<<<< HEAD
    this.slimLoadingBarService.start();
    this.subscription = this.communicate.getMatch$.subscribe(match => {
      this.match = match;
      this.slimLoadingBarService.complete();
=======
    this.slimLoadingBarservice.start();
    this.subscription = this.communicate.getMatch$.subscribe(match => {
      this.match = match;
      this.slimLoadingBarservice.complete();
>>>>>>> 7f23607b8f3b2ea294847287a500621915faf79b
    });
  }

}
