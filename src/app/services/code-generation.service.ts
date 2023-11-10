import { KeyValue } from '@angular/common';
import { Injectable, Input } from '@angular/core';
import { ICodeLine } from '../data/icode';
import { IComponent } from '../data/icomponent';
import { ITabData } from '../data/tab/itab-data';
import { LanguageNotFoundError } from '../exceptions/LanguageNotFoundException';

@Injectable({
  providedIn: 'root'
})
export class CodeGenerationService {

  constructor() { }


  getCode(component: IComponent, language: string): string[] {

    if (!(language in component.code)) {
      return [];
    }

    let replacements:any = {};
    component.inputs!.forEach(input => {
      replacements[input.name] = input.value;
    });

    let lines:string[] = []
    component.code[language].forEach(instruction => {
      if (instruction.instruction == undefined) {
        return;
      }
      let line = instruction.instruction;
      Object.keys(replacements).forEach(k => {
        const replacement = replacements[k];
        const key = `{{${k}}}`;

        while (line!.includes(key)) {
          line = line!.replace(key, replacement);
        }
      });

      lines.push(line);

      if (instruction.children == true && component.children) {
        const sortedKeys = Object.keys(component.children!).map(Number).sort((a, b) => a - b);

        sortedKeys.forEach((index) => {
          const child = component.children![index];

          lines = [...lines, ...this.getCode(child, language)];
        });

      }
    });
    return lines;
  }

  createCode(tab: ITabData, language: string): string[] {
    let lines: string[] = [];
    tab.components!.forEach(component => {
      lines = [...lines, ...this.getCode(component, language)];
    });

    return lines;
  }
}
