import { Component, Input, OnInit } from '@angular/core';
import { IText } from 'src/app/data/drawing/text/itext';
import { DrawBaseClass } from '../draw-base-class';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent extends DrawBaseClass implements OnInit {

  @Input() data!: IText;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
