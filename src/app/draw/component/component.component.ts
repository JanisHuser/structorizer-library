import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILine } from 'src/app/data/drawing/iline';
import { IRectangle } from 'src/app/data/drawing/shapes/irectangle';
import { IComponent } from 'src/app/data/icomponent';

@Component({
  selector: 'app-draw-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit, AfterViewInit {

  @Output() childAddedEvent = new EventEmitter<IComponent>();
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

  childRectClicked(rect: IRectangle) {

    if (this.component.children == undefined) {
      this.component.children = {};
    }


    const index = this.rectangles.indexOf(rect);

    if ( (index in this.component.children)) {
      this.component.children[index] = [];
    }
    // this.component.children[index].push()


    this.childAddedEvent.emit(this.component);
  }

}
