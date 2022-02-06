import { Component, Input, OnInit } from '@angular/core';
import { IStructure } from 'src/app/data/document/istructure';
import { IComponent } from 'src/app/data/visual/icomponent';
import { ComponentsService } from 'src/app/services/Components/components.service';

@Component({
  selector: 'app-draw-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.scss']
})
export class ParserComponent implements OnInit {
  @Input() structure!: IStructure;
  constructor(
    private componentService: ComponentsService
  ) {
  }

  ngOnInit(): void {
  }


  toComponent(c: IStructure) : IComponent | undefined {
    return this.componentService.getComponent({ identifier: c.identifier});
  }

}
