import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ContextComponent } from '../draw/context/context/context.component';
import { RectangleComponent } from '../draw/rectangle/rectangle.component';


@NgModule({
  declarations: [
    SidebarComponent,
    ContextComponent,
    RectangleComponent,
  ],
  imports: [
    CommonModule,
    EditorRoutingModule
  ],
  exports: [
    EditorRoutingModule
  ]
})
export class EditorModule { }
