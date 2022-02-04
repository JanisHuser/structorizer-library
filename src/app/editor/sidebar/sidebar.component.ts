import { Component, OnInit } from '@angular/core';
import { IComponent } from 'src/app/data/icomponent';
import { ComponentsService } from 'src/app/services/Components/components.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  components: IComponent[] = [];

  componentService: ComponentsService;

  constructor(
    private component: ComponentsService,
  ) {
    this.componentService = component;
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() : void {
    this.components = this.componentService.getComponents();
  }
}
