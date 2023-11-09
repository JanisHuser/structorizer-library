import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/data/icomponent';
import { ComponentsService } from 'src/app/services/Components/components.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() componentClickedEvent = new EventEmitter<IComponent>();
  components: IComponent[] = [];

  constructor(
    private component: ComponentsService,
    public language: LanguageService,
  ) {
    this.components = this.component.getComponents();
  }

  ngOnInit(): void {
  }

  addComponent(component: IComponent) {

    const copy = JSON.parse(JSON.stringify(component)) as typeof component;

    this.componentClickedEvent.emit(copy as IComponent);
  }

}
