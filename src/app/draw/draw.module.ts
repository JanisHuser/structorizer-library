import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RectangleComponent } from './rectangle/rectangle.component';
import { TextComponent } from './text/text.component';
import { ComponentComponent } from './component/component.component';
import { ChildComponent } from './child/child.component';



@NgModule({
  declarations: [
    RectangleComponent,
    TextComponent,
    ComponentComponent,
    ChildComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ComponentComponent
  ]
})
export class DrawModule { }
