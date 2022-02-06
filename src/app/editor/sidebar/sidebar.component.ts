import { Component, OnInit } from '@angular/core';
import { IComponent } from 'src/app/data/visual/icomponent';
import { ComponentsService } from 'src/app/services/Components/components.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    public component: ComponentsService,
    public language: LanguageService,
    private globals: GlobalService
  ) {

  }

  ngOnInit(): void {
  }


  setActiveComponent(component: IComponent) {
    this.globals.setSelectedComponent(component);
  }
}
