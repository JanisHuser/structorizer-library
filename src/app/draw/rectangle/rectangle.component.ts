import { Component, Input, OnInit } from '@angular/core';
import { IStructure } from 'src/app/data/document/istructure';
import { IRectangle } from 'src/app/data/visual/draw/irectangle';
import { DrawBaseClass } from '../draw-base-class';

@Component({
  selector: 'app-draw-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.scss']
})
export class RectangleComponent extends DrawBaseClass implements OnInit {

  @Input() rectangle!: IRectangle;
  @Input() structure!: IStructure;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
