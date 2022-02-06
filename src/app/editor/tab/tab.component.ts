import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { IPage } from 'src/app/data/document/ipage';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Input() data!: IPage;
  @Input() isActive: boolean = false;

  @Output() remove = new EventEmitter<IPage>();
  @Output() enable = new EventEmitter<IPage>();
  constructor() { }

  ngOnInit(): void {
  }

  removeTab() {
    this.remove.emit(this.data);
  }
  activateTab() {
    this.enable.emit(this.data);
  }

}
