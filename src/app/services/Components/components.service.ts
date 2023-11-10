import { Injectable } from '@angular/core';
import { IComponent } from 'src/app/data/icomponent';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResponse } from 'src/app/data/iresponse';
import { BorderStyle } from 'src/app/data/drawing/border-style';
import { Language } from 'src/app/data/language/language';
import { InputOptionType } from 'src/app/data/IInputOption';
import { bindCallback } from 'rxjs';

const assemblerComponents = (): IComponent[] => {
  return [
    {
      code: {
        assembler: [
          { "children": false, "instruction": "LDR {{LITERAL_NAME}},={{LITERAL_VALUE}}"}
        ]
      },
      title: {
        "de": "Define literal"
      },
      description: {
        "de": "Define literal"
      },
      acceptsChildren: false,
      inputs: [
        {
          header: {
            de: "Define literal (#define NAME VALUE)"
          },
          inputs: [
            {
              description: "Name",
              name: "LITERAL_NAME",
              type: InputOptionType.text,
              value: "",
              store: "literals"
            },
            {
              description: "Value",
              name: "LITERAL_VALUE",
              type: InputOptionType.text,
              value: "#0x00"
            },
          ]
        }
      ],
      drawing: [
        {
          rectangle: {
            border: {
              width: '1px',
              color: "#000",
              style: BorderStyle.solid
            },
            left: "0px",
            top: "0px",
            right: "0px",
            bottom: "0px",
          }
        },
        {
          text: {
            x: "0px",
            y: "0px",
            template: "Define {{LITERAL_NAME}} as {{LITERAL_VALUE}}"
          }
        }
      ],
      height: "50px"
    },
    {
      code: {
        assembler: [
          { "children": false, "instruction": "LDR {{REGISTER}},={{LITERAL_NAME}}"},
          { "children": false, "instruction": "LDR {{REGISTER}},({{REGISTER}})"},
        ]
      },
      title: {
        "de": "Load Literal Value"
      },
      description: {
        "de": "Load Literal Value"
      },
      acceptsChildren: false,
      inputs: [
        {
          header: {
            de: "Define literal (#define NAME VALUE)"
          },
          inputs: [
            {
              description: "Name",
              name: "LITERAL_NAME",
              type: InputOptionType.dropdown,
              value: "",
              store: "literals"
            },
            {
              description: "Value",
              name: "REGISTER",
              type: InputOptionType.dropdown,
              value: "R1",
              options: ["R1","R2", "R3", "R4", "R5", "R6", "R7", "R8"]
            },
          ]
        }
      ],
      drawing: [
        {
          rectangle: {
            border: {
              width: '1px',
              color: "#000",
              style: BorderStyle.solid
            },
            left: "0px",
            top: "0px",
            right: "0px",
            bottom: "0px",
          }
        },
        {
          text: {
            x: "0px",
            y: "0px",
            template: "Load Value from {{LITERAL_NAME}} into {{REGISTER}}"
          }
        }
      ],
      height: "50px"
    },
    
  ]
};


@Injectable({
  providedIn: 'root'
})
export class ComponentsService {


  headers = new HttpHeaders().set(
    'Content-Type','application/json'
  );
  
  constructor(
    // private httpClient: HttpClient
  ) {
    
  }

  getComponents() : IComponent[] {

    return assemblerComponents();
    // this.httpClient.get<IResponse<IComponent[]>>('/components/').subscribe(
    //   data => {
    //     return data.data;
    //   }
    // )
  }
}
