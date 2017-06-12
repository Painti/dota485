import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class CommunicateService {

  constructor() { }

  private match = new Subject<Object>();

  getMatch$ = this.match.asObservable();

  emitMatch(match: Object) {
    this.match.next(match);
  }

}
