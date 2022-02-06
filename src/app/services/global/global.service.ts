import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPosition } from 'src/app/data/drawing/position/iposition';
import { IComponent } from 'src/app/data/icomponent';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  private playfieldCursorPosition = new BehaviorSubject<IPosition>({x:0,y:0});
  private selectedComponent = new BehaviorSubject<IComponent | undefined>(undefined);

  setPlayfieldCursorPosition(position: IPosition) {
    this.playfieldCursorPosition.next(position);
  }

  getPlayfieldCursorPosition() : Observable<IPosition> {
    return this.playfieldCursorPosition.asObservable();
  }


  setSelectedComponent(component: IComponent) {
    this.selectedComponent.next(component);
  }

  getSelectedComponent(): Observable<IComponent | undefined> {
    return this.selectedComponent.asObservable();
  }
  getSelectedComponentValue() : IComponent | undefined {
    return this.selectedComponent.value;
  }
}
