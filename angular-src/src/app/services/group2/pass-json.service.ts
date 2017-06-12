import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class PassJsonService {

  constructor() { }

  private player = new Subject<Object>();

  getPlayer$ = this.player.asObservable();

  emitPlayer(player: Object) {
    this.player.next(player);
  }

  private total = new Subject<Object>();

  getTotal$ = this.total.asObservable();

  emitTotal(total: Object) {
    this.total.next(total);
  }

  private peer = new Subject<Array<Object>>();

  getPeer$ = this.peer.asObservable();

  emitPeer(peer: Array<Object>) {
    this.peer.next(peer);
  }

  private recentMatch = new Subject<Array<Object>>();

  getRecentMatch$ = this.recentMatch.asObservable();

  emitRecentMatch(recentMatch: Array<Object>) {
    this.recentMatch.next(recentMatch);
  }

  private wl = new Subject<Object>();

  getWl$ = this.wl.asObservable();

  emitWl(wl: Object) {
    this.wl.next(wl);
  }

  private heroes = new Subject<Array<Object>>();

  getHeroes$ = this.heroes.asObservable();

  emitHeroes(heroes: Array<Object>) {
    this.heroes.next(heroes);
  }
}
