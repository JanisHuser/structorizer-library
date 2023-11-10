import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IInputOption } from 'src/app/data/IInputOption';
import { StoreService } from 'src/app/services/Store/store.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() input!: IInputOption;
  @ViewChild('select') select!: ElementRef;

  options!: any[];

  private storeService!: StoreService

  constructor(storeService: StoreService){
    this.storeService = storeService;
  }

  ngOnInit(): void {
    this.storeService.addOption(this.input);
    if (this.input.store != null) {
      this.options = this.storeService.getOptions(this.input.store);
    }
    else {
      this.options = this.input.options!;
    }
  }

  onChange() : void {
    this.input.value = this.select.nativeElement.value;
    this.input.changed!.forEach(x=> {
      if (x === null) {
        return;
      }
      x();
    });
  }

}
