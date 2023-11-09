import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { ICodeLine } from '../data/icode';
import { IComponent } from '../data/icomponent';
import { ITabData } from '../data/tab/itab-data';
import { LanguageNotFoundError } from '../exceptions/LanguageNotFoundException';

@Injectable({
  providedIn: 'root'
})
export class CodeGenerationService {

  constructor() { }

  getInputs(tab: ITabData): { [id: string] : any; } {
    let inputs: { [id: string] : any; } = {};

    tab.components!.forEach(component => {
      component!.inputs!.forEach(inline => {
        inline!.inputs!.forEach(x => {
          inputs[x.name] = x.value;
        });
      });
    });

    return inputs;
  }

  SortByID = (a: KeyValue<number, ICodeLine>, b: KeyValue<number, ICodeLine>) => {
    return a.key > b.key ? 1 : (b.key > a.key ? -1 : 0);
  }

  getCodeFromComponent(component: IComponent, language: string): ICodeLine[] {
    let codeLines:ICodeLine[] = [];

    if (!(language in component.code)) {
      return codeLines;
    }

    component.code[language].forEach(line => {
      codeLines.push(line);
      if (line.children === true) {
        return;
      }
      if (component.children === null) {
        return;
      }

      let children = component.children!;

      Object.keys(children).sort().forEach(k => {
        let index: number = +k
        let subChildren = children[index];

        subChildren.forEach(c => {
          codeLines = [...codeLines, ...this.getCodeFromComponent(c, language)];
        });
      });
    });

    return codeLines;
  }

  getCodeLines(tab: ITabData, language: string): ICodeLine[] {
    let codeLines:ICodeLine[] = [];

    tab.components!.forEach(component => {
      if (!(language in component.code)) {
        return;
      }
      
      codeLines = [...codeLines, ...component.code[language]]
    });

    return codeLines;
  }


  replaceInputs(codeLine: ICodeLine,  inputs: { [id: string] : any; }): string {
    let line = codeLine.instruction!;
    Object.keys(inputs).forEach(k => {
      let key = `{{${k}}}`;

      line = line.replace(key, inputs[k]);
    });


    
    return line;
  }

  insertInputs(codeLines: ICodeLine[], inputs: { [id: string] : any; }): string[] {
    let code: string[] = [];


    codeLines.forEach(line => {
      if (line.instruction === null) {
        return;
      }
      code.push(this.replaceInputs(line, inputs));
    });

    return code;
  }

  createCode(tab: ITabData, language: string): string[] {

    let codeLines = this.getCodeLines(tab, language);

    if (codeLines.length == 0) {
      throw new LanguageNotFoundError(language);
    }

    let inputs = this.getInputs(tab);

    return this.insertInputs(codeLines, inputs);
  }
}
