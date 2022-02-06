import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { IElementPosition } from 'src/app/data/drawing/position/ielement-position';
import { IComponentExport } from 'src/app/data/export/icomponent-export';
import { GlobalService } from 'src/app/services/global/global.service';

const DELTA_RANGE: number = 10;

@Component({
  selector: 'app-draw-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, AfterViewInit {

  @Input() data!: IComponentExport;
  position: IElementPosition = {x1:0,y1:0,x2:0,y2:0};
  mouseOverPre: boolean = false;
  mouseOverAfter: boolean = false;
  componentInitialized: boolean = false;
  

  constructor(
    private globals: GlobalService,
    private element: ElementRef
  ) { 

    this.globals.getPlayfieldCursorPosition().subscribe(
      position => {
        const inRangeY1 = () => this.inRange(this.position.y1,position.y, DELTA_RANGE);
        const inRangeY2 = () => this.inRange(this.position.y2,position.y, DELTA_RANGE);
        
        const inRangeX1 = () => position.x >= this.position.x1;
        const inRangeX2 = () => position.x <= this.position.x2;

        if (!this.componentInitialized) {
          return;
        }

        if (this.globals.getSelectedComponentValue() == undefined) {
          return;
        }

        if (!inRangeX1() || !inRangeX2()) {
          this.mouseOverAfter = false;
          this.mouseOverPre = false;
          return;
        }

        if (inRangeY1()) {
          this.mouseOverPre = true;
        } else {
          this.mouseOverPre = false;
        }

        if (inRangeY2()) {
          this.mouseOverAfter = true;
        } else {
          this.mouseOverAfter = false;
        }
      }
    );
  }

  inRange(a:number, b: number, delta: number) : boolean {
    let difference = Math.abs(a-b);
    return difference < delta;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() : void {
    const rect = this.element.nativeElement.getBoundingClientRect();

    this.position = {
      x1: rect.left,
      x2: rect.left + rect.width,
      y1: rect.top,
      y2: rect.top + rect.height
    };

    this.componentInitialized = true;
  }


}
