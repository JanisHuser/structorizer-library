import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IComponent } from '../data/icomponent';
import { ComponentsService } from '../services/Components/components.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit,AfterViewInit {

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
