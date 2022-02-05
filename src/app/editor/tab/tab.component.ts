import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ITabData } from 'src/app/data/tab/itab-data';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Input() data: ITabData | undefined;

  @Output() remove = new EventEmitter<ITabData >();
  @Output() enable = new EventEmitter<ITabData>();
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
