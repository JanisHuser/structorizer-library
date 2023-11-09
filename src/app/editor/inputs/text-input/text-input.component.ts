import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IInputOption } from 'src/app/data/IInputOption';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  @Input() input!: IInputOption;

  @ViewChild('textInput') textInput!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  onInputChange(option: IInputOption) : void {
    option.value = this.textInput.nativeElement.value;
    option.changed!.forEach(x=> {
      if (x != null) {
        x();
      }
    });
  }

}
