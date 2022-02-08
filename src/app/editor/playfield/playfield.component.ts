import {
  Component,
  AfterViewInit,
  OnInit,
  HostListener, ElementRef} from '@angular/core';
import { IPage } from 'src/app/data/document/ipage';
import { IStructure } from 'src/app/data/document/istructure';
import { ElementPosition } from 'src/app/draw/positioning/element-position';
import { IPosition } from 'src/app/draw/positioning/iposition';
import { ComponentsService } from 'src/app/services/Components/components.service';
import { DocumentService } from 'src/app/services/document/document.service';
import { PlaygroundService } from 'src/app/services/playground/playground.service';

@Component({
  selector: 'app-playfield',
  templateUrl: './playfield.component.html',
  styleUrls: ['./playfield.component.scss']
})
export class PlayfieldComponent implements OnInit, AfterViewInit {

  elementPosition?: ElementPosition;
  previewElementSize: IPosition = {x:100,y:100};
  lastCursorPosition: IPosition = {x:0,y:0};
  activeStructure: IStructure = {identifier: ""};

  constructor(
    public document: DocumentService,
    public playground: PlaygroundService,
    private element: ElementRef
  ) {

    playground.getActiveComponentIdentifier().subscribe(
      id => {
        this.activeStructure = {
          identifier: id.identifier
        }
      } 
    );

   }

  ngOnInit(): void {
  }

  ngAfterViewInit() : void {
    this.elementPosition = new ElementPosition(this.element);
  }
  
  enablePage(page: IPage) {
    this.document.setActivePage(page);
  }

  removePage(page: IPage) {
    this.document.removePage(page);
  }

  addNewPage() {
    this.document.addPage({
      title: "title",
      structure: {
        children: [],
        identifier: "main-structure",
        properties: new Map<string,any>()
      },
      createdOn: new Date()
    })
  }

  @HostListener('mousemove', ['$event']) 
  onMouseMove(e: MouseEvent) {
    
    let position: IPosition = {
      x: e.pageX - this.elementPosition!.x1 - this.previewElementSize.x / 2,
      y: e.pageY - this.elementPosition!.y1 - this.previewElementSize.y / 2
    };

    if (position.x < 0) {
      position.x = 0;
    }

    if (position.y < 0) {
      position.x = 0;
    }

    this.lastCursorPosition = position;
    this.playground.setPosition(position);
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(e: MouseEvent) {
    
  }

}
