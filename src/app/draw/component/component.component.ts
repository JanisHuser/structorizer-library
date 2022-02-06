import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core';
import { ILine } from 'src/app/data/drawing/iline';
import { IPosition } from 'src/app/data/drawing/position/iposition';
import { IRectangle } from 'src/app/data/drawing/shapes/irectangle';
import { IComponentExport } from 'src/app/data/export/icomponent-export';
import { IComponent } from 'src/app/data/icomponent';
import { GlobalService } from 'src/app/services/global/global.service';
import { DrawBaseClass } from '../draw-base-class';

@Component({
  selector: 'app-draw-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit, AfterViewInit {

  @Input() component! : IComponent;
  @Input() data!: IComponentExport;
  rectangles: IRectangle[] = [];
  lines: ILine[] = [];

  mouseOverPre: boolean = false;
  mouseOverAfter: boolean = false;
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
