import { Component, ElementRef, Input, OnInit, ViewChild, ɵresetJitOptions } from '@angular/core';
import { IComponent } from 'src/app/data/icomponent';
import { IInputOption, InputOptionType } from 'src/app/data/IInputOption';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {
  @Input() component?: IComponent;
  constructor() { }

  language: string = "de";

  ngOnInit(): void {
    
  }

  

  isText(option: IInputOption) : boolean {
    return option.type == InputOptionType.text;
  }

  isDropdown(option: IInputOption) : boolean {
    return option.type == InputOptionType.dropdown;
  }
}
