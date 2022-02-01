import { Component, Input, OnInit } from '@angular/core';
import { IStyle } from '../data/istyle';

@Component({
  selector: 'draw-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.scss']
})
export class RectangleComponent implements OnInit {

  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() height: number = 0;
  @Input() width: number = 0;

  @Input() rx: number = 0;
  @Input() ry: number = 0;

  @Input() style: IStyle | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
