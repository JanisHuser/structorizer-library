import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextComponent } from './context/context/context.component';
import { RectangleComponent } from './rectangle/rectangle.component';



@NgModule({
  declarations: [
    ContextComponent,
    RectangleComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContextComponent
  ]
})
export class DrawModule { }
