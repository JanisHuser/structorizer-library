import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IInputOption } from 'src/app/data/IInputOption';
import { StoreService } from 'src/app/services/Store/store.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  @Input() input!: IInputOption;

  @ViewChild('textInput') textInput!: ElementRef;
  
  private storeService!: StoreService

  constructor(storeService: StoreService){
    this.storeService = storeService;
  }

  ngOnInit(): void {
    this.storeService.addOption(this.input);
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
