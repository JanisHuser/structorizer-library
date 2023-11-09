import { Component, ViewChild } from '@angular/core';
import { EditorComponent } from './editor/editor/editor.component';
import { CodeGenerationService } from './services/code-generation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'structorizer-v2';

  @ViewChild('editor') editor!: EditorComponent;


  codeExportEvent() {
    console.log("export")
    let tabs = this.editor.getTabData();


    let service: CodeGenerationService = new CodeGenerationService();

    let tab = tabs[0];
    console.log(service.createCode(tab, "assembler"));
  }

}
