import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { IStructure } from 'src/app/data/document/istructure';

@Component({
  selector: 'app-draw-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.scss']
})
export class ParserComponent implements OnInit {
  @Input() structure!: IStructure;
  constructor(
  ) { }

  ngOnInit(): void { }
}
