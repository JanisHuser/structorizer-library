import { Component, HostListener, Input, OnInit } from '@angular/core';
import { IRectangle } from 'src/app/data/drawing/shapes/irectangle';
import { DrawBaseClass } from '../draw-base-class';
import { MouseState } from '../general/mouse-state';

@Component({
  selector: 'draw-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.scss'],
})
export class RectangleComponent extends DrawBaseClass implements OnInit{

  @Input() acceptsChildren: boolean | undefined = false;
  @Input() rect!: IRectangle;

  constructor() {
    super();
  }

  ngOnInit(): void { }

  @HostListener('mousedown') onMouseDown() {
    DrawBaseClass.MouseState = MouseState.MouseDown;
  }

  @HostListener('mouseup') onMouseUp() {
    DrawBaseClass.MouseState = MouseState.MouseUp;
  }

  @HostListener('dblclick', ['$event'])
  onDblClick(event: any) {
    // Open Component Settings
  }


}
