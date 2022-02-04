import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { DrawModule } from '../draw/draw.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EditorComponent } from './editor/editor.component';


@NgModule({
  declarations: [
    EditorComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    DrawModule
  ],
  exports: [
    EditorRoutingModule
  ]
})
export class EditorModule { }
