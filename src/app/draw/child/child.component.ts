import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { IStructure } from 'src/app/data/document/istructure';
import { GlobalService } from 'src/app/services/global/global.service';
import { ElementPosition } from '../positioning/element-position';

const DELTA_RANGE: number = 10;

@Component({
  selector: 'app-draw-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, AfterViewInit {

  @Input() structure!: IStructure;
  position?: ElementPosition;
  mouseOverPre: boolean = false;
  mouseOverAfter: boolean = false;
  componentInitialized: boolean = false;
  

  constructor(
    private globals: GlobalService,
    private element: ElementRef
  ) { 

    this.globals.getPlayfieldCursorPosition().subscribe(
      position => {

        if (!this.componentInitialized) {
          return;
        }

        if (this.globals.getSelectedComponentValue() == undefined) {
          return;
        }

        if(!this.position!.inRangeX(position.x)) {
          this.mouseOverAfter = false;
          this.mouseOverPre = false;
          return;
        }

        if (this.position!.inRangeTop(position.y)) {
          this.mouseOverPre = true;
        }
        
        if (this.position!.inRangeBottom(position.y)) {
          this.mouseOverAfter = true;
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
    this.position = new ElementPosition(this.element);
    this.componentInitialized = true;
  }


}
