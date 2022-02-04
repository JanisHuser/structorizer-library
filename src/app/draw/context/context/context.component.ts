import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { ILine } from 'src/app/data/drawing/iline';
import { IRectangle } from 'src/app/data/drawing/shapes/irectangle';
import { IComponent } from 'src/app/data/icomponent';


@Component({
  selector: 'draw-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss']
})
export class ContextComponent implements OnInit,AfterViewInit {
  @Input() component: IComponent | undefined;

  rectangles: IRectangle[] = [];
  lines: ILine[] = [];

  constructor(
    private changedetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() : void {
    if (this.component == null) {
      throwError(() => new Error("component cannot be null"));
    }
    if (!(this.component?.drawing instanceof Array)) {
      return;
    }

    let update: boolean = false;
    this.component.drawing.forEach(
      draw => {
        if (draw.rectangle != null) {
          this.rectangles.push(draw.rectangle);
          update = true;
        }
        
        
        if (draw.line != null) {
          this.lines.push(draw.line);
          update = true;
        }
      }
    )

    if (update) {
      this.changedetector.detectChanges();
    }
  }
}