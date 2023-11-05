import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IInputOption } from 'src/app/data/IInputOption';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() input!: IInputOption;
  @ViewChild('select') select!: ElementRef;

  options!: any[] | undefined;

  constructor() { }

  ngOnInit(): void {
    this.options = this.input.options;
  }

  onChange() : void {
    this.input.value = this.select.nativeElement.value;
    this.input.changed!.forEach(x=> {
      x();
    });
  }

}
