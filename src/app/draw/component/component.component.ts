import { Component, Input, OnInit } from '@angular/core';
import { IComponentExport } from 'src/app/data/export/icomponent-export';
import { IComponent } from 'src/app/data/visual/icomponent';

@Component({
  selector: 'app-draw-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {

  @Input() component! : IComponent;
  @Input() data!: IComponentExport;

  constructor() { }
  
  ngOnInit(): void {
  }
}
