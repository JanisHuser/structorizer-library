import { Component, OnInit } from '@angular/core';
import { IStructure } from 'src/app/data/document/istructure';
import { IComponent } from 'src/app/data/visual/icomponent';
import { ComponentsService } from 'src/app/services/Components/components.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { PlaygroundService } from 'src/app/services/playground/playground.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  emptyStructures: IStructure[] = [];
  constructor(
    public components: ComponentsService,
    public language: LanguageService,
    public playground: PlaygroundService
  ) {
  }

  createEmptyStructure(component: IComponent) : IStructure {
    return {
      identifier: component.identifier.identifier,
      children: [],
      properties: new Map<string,any>()
    };
  }

  ngOnInit(): void {
  }
}
