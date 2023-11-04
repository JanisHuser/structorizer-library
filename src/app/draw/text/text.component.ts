import { Component, Input, OnInit } from '@angular/core';
import { IText } from 'src/app/data/drawing/text/itext';
import { IComponent } from 'src/app/data/icomponent';
import { IConfiguration, IInputOption } from 'src/app/data/IInputOption';
import { DrawBaseClass } from '../draw-base-class';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent extends DrawBaseClass implements OnInit {

  @Input() data!: IText;
  @Input() component!: IComponent;
  text: string = "";

  constructor() {
    super();

    
  }

  ngOnInit(): void {
    this.extractTemplates();
  }

  extractTemplates(): void {
    if (this.data.template == null) {
      return;
    }

    this.component.inputs!.forEach(input => {
      input.inputs!.forEach(x => {
        const key = "{{" + x.name + "}}";
        if (this.data.template!.includes(key)) {

          if (x.changed == undefined) {
            x.changed = [];
          }
          x.changed?.push(this.updateText);
        }
      });
    });

    this.updateText();
  }

  updateText() : void {
    return;
    //TODO: FIX THIS
    let textCopy = this.data.template!;


    this.component.inputs!.forEach(input => {
      input.inputs!.forEach(x => {
        textCopy = textCopy.replace("{{" + x.name + "}}", x.value);
      });
    });

    this.text = textCopy;
  }

}
