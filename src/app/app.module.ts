import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContextComponent } from './draw/context/context/context.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RectangleComponent } from './draw/context/rectangle/rectangle/rectangle.component';

@NgModule({
  declarations: [
    AppComponent,
    ContextComponent,
    SidebarComponent,
    RectangleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
