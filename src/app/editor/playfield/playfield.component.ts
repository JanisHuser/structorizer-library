import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IComponent } from 'src/app/data/icomponent';
import { ITabData } from 'src/app/data/tab/itab-data';
import { ComponentsService } from 'src/app/services/Components/components.service';
import { ComponentComponent } from 'src/app/draw/component/component.component';
import { IDrawing } from 'src/app/data/idrawing';
import { IConfiguration } from 'src/app/data/IInputOption';


class EmptyComponent implements IComponent {
  title = {
      en: '',
      de: ''
  };
  description  = {
      en: '',
      de: ''
  };
  acceptsChildren: boolean | undefined;
  drawing: IDrawing[] | undefined;

  

  constructor() {
      // Initialize the properties as needed
  }
  code = {};
  
  children?: { [index: number]: IComponent[]; } | undefined;
  inputs?: IConfiguration[] | undefined;
}


@Component({
  selector: 'app-playfield',
  templateUrl: './playfield.component.html',
  styleUrls: ['./playfield.component.scss']
})
export class PlayfieldComponent implements OnInit {
  activeComponentLeft: string = "0px";
  activeComponentTop: string = "0px";
  tabs: ITabData[] = [
    {
      title: "main",
      components: [],
      isActive: true
    }
  ];

  @ViewChild('activeComponent') component!: ComponentComponent;

  activeTab: ITabData = this.tabs[0];
  activeComponentValue: IComponent = new EmptyComponent();
  selectedComponent?: IComponent = undefined;


  hasActiveComponent: boolean = false

  constructor(
    private components: ComponentsService
  ) { }

  ngOnInit(): void {
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
    }
    
  }

  setComponentActive(component: IComponent) {
    this.activeComponentValue = component;

    this.hasActiveComponent = true;
  }
  dropComponent() {
    this.hasActiveComponent = false;
  }

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(event: MouseEvent) {
    if (!this.hasActiveComponent) {
      return;
    }
    this.activeComponentTop = (event.clientY+10) + "px";
    this.activeComponentLeft = (event.clientX-50) + "px";
  }

  @HostListener('document:touchMove', ['$event']) 
  onTouchMove(event: MouseEvent) {
    if (!this.hasActiveComponent) {
      return;
    }
    this.activeComponentTop = (event.clientY+10) + "px";
    this.activeComponentLeft = (event.clientX-50) + "px";
  }

  placeholderClicked() {
    if (!this.hasActiveComponent) {
      return;
    }

    const clonedComponent = Object.assign({}, this.activeComponentValue);
    this.activeTab.components.push(clonedComponent)

    this.hasActiveComponent = false;
  }

  componentSelected(component: IComponent) {
    if (this.hasActiveComponent) {
      return;
    }
    if (this.selectedComponent == component) {
      this.selectedComponent = undefined;
    } else {
      this.selectedComponent = component;
    }
 
  }


  childAfterInsert(index: number) {
    this.insertChild(index+1);
  }

  childPreInsert(index: number) {
    this.insertChild(index);
  }

  insertChild(index: number) {
    if (this.activeTab.components.length > index) {
      this.activeTab.components.splice(index, 0, this.activeComponentValue);
    } else {
      this.activeTab.components.push(this.activeComponentValue);
    }

    
    this.hasActiveComponent = false;
  }


}
