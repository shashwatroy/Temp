import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private selectedSongs = new BehaviorSubject('Initial message!!!');
  getSong = this.selectedSongs.asObservable();
  
  constructor() { }

  setSong(selectedSongs: string) {
    this.selectedSongs.next(selectedSongs);
  }

}
