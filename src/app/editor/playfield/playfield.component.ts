import {
  Component,
  AfterViewInit,
  OnInit,
  Output, EventEmitter, Input, HostListener, ElementRef} from '@angular/core';
import { IPosition } from 'src/app/data/drawing/position/iposition';
import { IComponent } from 'src/app/data/icomponent';
import { ITabData } from 'src/app/data/tab/itab-data';
import { ComponentsService } from 'src/app/services/Components/components.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-playfield',
  templateUrl: './playfield.component.html',
  styleUrls: ['./playfield.component.scss']
})
export class PlayfieldComponent implements OnInit, AfterViewInit {

  @Output() activeTabChanged = new EventEmitter<ITabData>();

  elementPosition: IPosition = {x:0,y:0};
  previewElementSize: IPosition = {x:100,y:100};
  lastCursorPosition: IPosition = {x:0,y:0};
  activeComponent: IComponent | undefined = undefined;

  tabs: ITabData[] = [
    {
      title: "main",
      components:
      [
        this.components.getComponents()[0],
        
      ],
      isActive: true
    }
  ];



  private MOUSE_CURSOR_DELTA: number  = 20;

  activeTab: ITabData = this.tabs[0];
  constructor(
    private components: ComponentsService,
    public globals: GlobalService,
    private element: ElementRef
  ) {

    globals.getSelectedComponent().subscribe(
      component => this.activeComponent = component
    );


    this.tabs[0].components = [];
    this.tabs[0].components.push(this.components.getComponents()[0])
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() : void {
    const rect = this.element.nativeElement.getBoundingClientRect();
    this.elementPosition.x = rect.left;
    this.elementPosition.y = rect.top;


    this.globals.setPlayfieldCursorPosition({
      x: rect.left,
      y: rect.top
    })
  }

  removeTab(tab: ITabData) {
    if (this.tabs.length == 1) {
      //TODO: show message, last tab cannot be deleted
      alert("last tab cannot be deleted");
      return;
    }
    if (!this.tabs.includes(tab)) {
      //TODO: show message, invalid tab
      alert("invalid tab");
      return;
    }
    this.tabs.splice(this.tabs.indexOf(tab),1);

    if (this.activeTab == tab) {
      this.setTabActive(this.tabs[0]);
    }
  }

  enableTab(tab: ITabData) {
    this.setTabActive(tab);
   
  }

  addTab() {
    let tabData: ITabData = {
      title: "new tab",
      components: [],
      isActive: false
    };
    
    this.tabs.push(tabData);
    this.setTabActive(tabData);
  }

  setTabActive(tab: ITabData) {

    if (this.activeTab != tab) {
      this.tabs.forEach(x => {
        x.isActive = false;
      });
  
      tab.isActive = true;
      this.activeTab = tab;
      this.activeTabChanged.emit(tab);
    }
  }


  @HostListener('mousemove', ['$event']) 
  onMouseMove(e: MouseEvent) {
    
    let position: IPosition = {
      x: e.pageX - this.previewElementSize.x / 2,
      y: e.pageY - this.previewElementSize.y / 2
    };


    if (this.elementPosition.x > position.x ) {
      position.x = this.elementPosition.x;
    }
    if (this.elementPosition.y >  position.y ) {
      position.y = this.elementPosition.y;
    }

    this.lastCursorPosition = position;
    this.globals.setPlayfieldCursorPosition({
      x: e.pageX,
      y: e.pageY
    });
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(e: MouseEvent) {
    
  }

  drawPoint(x: number, y:number) {
    const point = document.createElement("div");
    point.style.backgroundColor = "red";
    point.style.height = "4px";
    point.style.width = "4px";
    point.style.position = "absolute";
    point.style.zIndex = "100";
    point.style.left = x + 'px';
    point.style.top = y +'px';
    this.element.nativeElement.appendChild(point);
  }


 }
