import { Injectable } from '@angular/core';

const players = [ 'Downey, Eric', 'Smith, Frank', 'Davis, Steve', 'Gant, Steve', 'Joynt, Sean' ].sort();

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor() { }

  get() {
    return new Promise(resolve => resolve(players));
  }
}


