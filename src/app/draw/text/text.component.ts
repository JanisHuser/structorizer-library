import { Component, Input, OnInit } from '@angular/core';
import { IText } from 'src/app/data/visual/draw/itext';
import { DrawBaseClass } from '../draw-base-class';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent extends DrawBaseClass implements OnInit {

  @Input() text!: IText;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
