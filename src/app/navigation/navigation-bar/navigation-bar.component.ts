import { Component, OnInit, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Output() importEvent = new EventEmitter();
  @Output() exportEvent = new EventEmitter();
  @Output() codeExportEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  importClicked() {

  }

  exportClicked() {

  }

  reloadClicked() {

  }
  
  createCode() {
    this.codeExportEvent.emit();
  }

}
