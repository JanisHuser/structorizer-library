import { Component, Input, OnInit } from '@angular/core';
import { IRectangle } from 'src/app/data/drawing/shapes/irectangle';
import { DrawBaseClass } from '../draw-base-class';

@Component({
  selector: 'app-draw-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.scss']
})
export class RectangleComponent extends DrawBaseClass implements OnInit {

  @Input() data!: IRectangle ;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
