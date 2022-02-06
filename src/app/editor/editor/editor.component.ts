import { Component, OnInit } from '@angular/core';
import { IComponent } from 'src/app/data/visual/icomponent';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  activeComponent: IComponent | undefined = undefined;
  constructor() { }

  ngOnInit(): void {
  }

  activateComponent(component: IComponent) {
    this.activeComponent = component;
  }

}
