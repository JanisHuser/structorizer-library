import { Component, OnInit } from '@angular/core';
import { ITabData } from 'src/app/data/tab/itab-data';
import { ComponentsService } from 'src/app/services/Components/components.service';

@Component({
  selector: 'app-playfield',
  templateUrl: './playfield.component.html',
  styleUrls: ['./playfield.component.scss']
})
export class PlayfieldComponent implements OnInit {

  tabs: ITabData[] = [
    {
      title: "main",
      components:
      [
        this.components.getComponents()[0]
      ],
      isActive: true
    }
  ];

  activeTab: ITabData = this.tabs[0];
  constructor(
    private components: ComponentsService
  ) { }

  ngOnInit(): void {
  }


  removeTab(tab: ITabData) {
    if (this.tabs.length == 1) {
      //TODO: show message, last tab cannot be deleted
      alert("last tab cannot be deleted");
      return;
    }
    if (!this.tabs.includes(tab)) {
      //TODO: show message, invalid tab
      alert("invalid tab");
      return;
    }
    this.tabs.splice(this.tabs.indexOf(tab),1);

    if (this.activeTab == tab) {
      this.setTabActive(this.tabs[0]);
    }
  }

  enableTab(tab: ITabData) {
    this.setTabActive(tab);
   
  }

  addTab() {
    let tabData: ITabData = {
      title: "new tab",
      components: [],
      isActive: false
    };
    
    this.tabs.push(tabData);
    this.setTabActive(tabData);
  }

  setTabActive(tab: ITabData) {

    if (this.activeTab != tab) {
      this.tabs.forEach(x => {
        x.isActive = false;
      });
  
      tab.isActive = true;
      this.activeTab = tab;
    }
    
  }

}
