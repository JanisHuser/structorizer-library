import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { DrawModule } from '../draw/draw.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EditorComponent } from './editor/editor.component';
import { PlayfieldComponent } from './playfield/playfield.component';
import { TabComponent } from './tab/tab.component';


@NgModule({
  declarations: [
    EditorComponent,
    SidebarComponent,
    PlayfieldComponent,
    TabComponent,
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
