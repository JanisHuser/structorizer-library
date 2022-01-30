import { Component, ElementRef, OnInit,ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss']
})
export class ContextComponent implements OnInit {
  @ViewChild('context')
  context!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.context.nativeElement.innerHTML = "DOM updated succesfully!!!"; 
  }

  public addChild(component: ContextComponent) {
    this.context.nativeElement.children.add(component);
  }

}
