import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { IStructure } from 'src/app/data/document/istructure';
import { PlaygroundService } from 'src/app/services/playground/playground.service';
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
  componentActive: boolean = false;

  constructor(
    private playground: PlaygroundService,
    private element: ElementRef
  ) { 
    this.playground.getActiveComponentIdentifier().subscribe({
      next: (id) => {
        if (id.identifier == undefined || id.identifier.length == 0) {
          this.componentActive = false;
        } else {
          this.componentActive = true;
        }
      }
    });

    this.playground.getPosition().subscribe({
      next: (position) => {
        if (!this.componentInitialized) {
          return;
        }

        if (!this.componentActive) {
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
    });
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
