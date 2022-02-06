import { Component, Input, OnInit } from '@angular/core';
import { IComponentExport } from 'src/app/data/export/icomponent-export';
import { IComponent } from 'src/app/data/visual/icomponent';
import { ComponentsService } from 'src/app/services/Components/components.service';

@Component({
  selector: 'app-draw-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.scss']
})
export class ParserComponent implements OnInit {
  @Input() component!: IComponentExport;
  constructor(
    private componentService: ComponentsService
  ) { }

  ngOnInit(): void {
  }


  toComponent(c: IComponentExport) : IComponent | undefined {
    return this.componentService.getComponent({ identifier: c.identifier});
  }

}
