import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ILine } from 'src/app/data/drawing/iline';
import { IRectangle } from 'src/app/data/drawing/shapes/irectangle';
import { IComponent } from 'src/app/data/icomponent';
import { DrawBaseClass } from '../draw-base-class';

@Component({
  selector: 'app-draw-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit, AfterViewInit {

  @Input() component! : IComponent;


  rectangles: IRectangle[] = [];
  lines: ILine[] = [];
  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() : void {
    if (!(this.component.drawing instanceof Array)) {
      return;
    }

    this.component.drawing.forEach(
      shape => {
        if (shape.rectangle != null) {
          this.rectangles.push(shape.rectangle);
        }
        if (shape.line != null) {
          this.lines.push(shape.line);
        }
      }
    )
    this.changeDetector.detectChanges();
  }

}
