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

  constructor(
    private component: ComponentsService,
  ) {
    this.components = this.component.getComponents();
  }

  ngOnInit(): void {
  }
}
