import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  private _tabSelectionSource = new Subject<string>();
  tabSelection$ = this._tabSelectionSource.asObservable();

constructor() { }

  sendTab(tabString: string) {
    this._tabSelectionSource.next(tabString);
  }
}
