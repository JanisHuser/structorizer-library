import { Component, Input, OnInit } from '@angular/core';
import { ILine } from 'src/app/data/drawing/iline';
import { DrawBaseClass } from '../../draw-base-class';

@Component({
  selector: 'app-draw-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent extends DrawBaseClass implements OnInit {

  @Input() data!: ILine;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
