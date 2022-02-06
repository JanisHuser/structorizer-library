import { Component, Input, OnInit } from '@angular/core';
import { IStructure } from 'src/app/data/document/istructure';
import { IComponent } from 'src/app/data/visual/icomponent';
import { ComponentsService } from 'src/app/services/Components/components.service';

@Component({
  selector: 'app-draw-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {

  @Input() structure!: IStructure;

  constructor(
    private componentService: ComponentsService
  ) { 
  }
  
  ngOnInit(): void {
  }

  getComponent() : IComponent {
    return this.componentService.getComponent({identifier: this.structure.identifier})!;
  }

  

}
