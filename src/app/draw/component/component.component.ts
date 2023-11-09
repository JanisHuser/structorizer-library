import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILine } from 'src/app/data/drawing/iline';
import { IRectangle } from 'src/app/data/drawing/shapes/irectangle';
import { IText } from 'src/app/data/drawing/text/itext';
import { IComponent } from 'src/app/data/icomponent';



@Component({
  selector: 'app-draw-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit, AfterViewInit {

  @Output() childAddedEvent = new EventEmitter<IComponent>();
  @Output() childPreInsertEvent = new EventEmitter<ComponentComponent>();
  @Output() childAfterInsertEvent = new EventEmitter<ComponentComponent>();

  @Input() displayOnly: boolean = false;
  @Input() showInsert: boolean = false;
  @Input() component! : IComponent;
  


  rectangles: IRectangle[] = [];
  lines: ILine[] = [];
  texts: IText[] = [];

  mouseOver: boolean = false;
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
        if (shape.text != null) {
          this.texts.push(shape.text);
        }
      }
    )
    this.changeDetector.detectChanges();
  }

  childRectClicked(rect: IRectangle) {
    if (this.displayOnly) {
      return;
    }
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

  preMouseUp() {
    this.childPreInsertEvent.emit(this);
  }

  afterMouseUp() {
    this.childAfterInsertEvent.emit(this);
  }
}
