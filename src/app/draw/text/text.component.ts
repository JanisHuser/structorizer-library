import { Component, Input, OnInit } from '@angular/core';
import { IText } from 'src/app/data/drawing/text/itext';
import { IComponent } from 'src/app/data/icomponent';
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
      const key = "{{" + input.name + "}}";
      if (this.data.template!.includes(key)) {

        if (input.changed == undefined) {
          input.changed = [];
        }
        input.changed?.push(this.updateText.bind(this));
      }
    });

    this.updateText();
  }

  updateText() : void {
    let textCopy = this.data.template!;
    this.component.inputs!.forEach(input => {
      const key = `{{${input.name}}}`;
      while (textCopy.includes(key)) {
        textCopy = textCopy.replace(key, input.value);
      }
    });

    this.text = textCopy;
  }

}
