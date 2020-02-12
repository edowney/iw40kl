import { Injectable } from '@angular/core';

const tracks: string[] = [ 'Best Overall', 'Best General', 'Best Hobbiest' ].sort();

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  constructor() { }

  get() {
    return new Promise(resolve => resolve(tracks));
  }
}
