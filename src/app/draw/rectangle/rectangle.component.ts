import { Component, Input, OnInit } from '@angular/core';
import { IRectangle } from 'src/app/data/drawing/shapes/irectangle';
import { IComponentExport } from 'src/app/data/export/icomponent-export';
import { DrawBaseClass } from '../draw-base-class';

@Component({
  selector: 'app-draw-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.scss']
})
export class RectangleComponent extends DrawBaseClass implements OnInit {

  @Input() rectangle!: IRectangle;
  @Input() data!: IComponentExport;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
