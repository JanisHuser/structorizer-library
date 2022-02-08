import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IIdentifier } from 'src/app/data/common/iidentifier';
import { IPosition } from 'src/app/draw/positioning/iposition';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundService {

  position = new BehaviorSubject<IPosition>(
    {x:0,y:0}
  );

  activeComponentIdentifier = new BehaviorSubject<IIdentifier>(
    {
      identifier: ""
    }
  );
  constructor() { }

  getActiveComponentIdentifier() : Observable<IIdentifier> {
    return this.activeComponentIdentifier.asObservable();
  }

  setActiveComponentIdentifier(identifier: IIdentifier) {
    this.activeComponentIdentifier.next(identifier);
  }

  getPosition() : Observable<IPosition> {
    return this.position.asObservable();
  }

  setPosition(position: IPosition) {
    this.position.next(position);
  }


}
