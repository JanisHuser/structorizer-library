import { Component, Input, OnInit, ɵresetJitOptions } from '@angular/core';
import { IComponent } from 'src/app/data/icomponent';
import { IInputOption } from 'src/app/data/IInputOption';
import { IConfiguration } from 'src/app/data/IInputOption';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {
  @Input() component?: IComponent;

  inputs!: IConfiguration[]
  constructor() { }

  ngOnInit(): void {
    if (this.component!.inputs == undefined) {
      this.inputs = [];
    }
    else {
      this.inputs = this.component!.inputs;
    }
  }

  onInputChange(option: IInputOption) : void {
    option.changed!.forEach(x=> {
      x();
    });
  }
}
