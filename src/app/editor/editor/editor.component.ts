import { Component, OnInit, ViewChild } from '@angular/core';
import { IComponent } from 'src/app/data/icomponent';
import { PlayfieldComponent } from '../playfield/playfield.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('playfield') playfield!: PlayfieldComponent;
  constructor() { }

  ngOnInit(): void {
  }

  showComponent(component: IComponent) {
    this.playfield.setComponentActive(component);
  }
}
