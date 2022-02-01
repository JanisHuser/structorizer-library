import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { ILine } from 'src/app/data/drawing/iline';
import { IRectangle } from 'src/app/data/drawing/shapes/irectangle';
import { IComponent } from 'src/app/data/icomponent';


@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss']
})
export class ContextComponent implements OnInit,AfterViewInit {
  @Input() component: IComponent | undefined;

  rectangles: IRectangle[] = [];
  lines: ILine[] = [];

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() : void {
    if (this.component == null) {
      throwError(() => new Error("component cannot be null"));
    }
    if (!(this.component?.drawing instanceof Array)) {
      return;
    }
    this.component.drawing.forEach(
      draw => {
        if (draw.rectangle != null) {
          this.rectangles.push(draw.rectangle);
        }
        
        if (draw.line != null) {
          this.lines.push(draw.line);
        }
      }
    )
  }
}