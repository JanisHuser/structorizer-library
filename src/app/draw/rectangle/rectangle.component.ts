import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRectangle } from 'src/app/data/drawing/shapes/irectangle';
import { DrawBaseClass } from '../draw-base-class';

@Component({
  selector: 'app-draw-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.scss']
})
export class RectangleComponent extends DrawBaseClass implements OnInit {

  @Output() childClickedEvent = new EventEmitter<IRectangle>();
  @Input() data!: IRectangle;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  childClicked(event: any) {
    this.childClickedEvent.emit(this.data);
  }

}
