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
      languages: {
        assembler: [
          { "children": false, "instruction": "LDR R1,=LITERAL"}
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
              type: InputOptionType.text
            },
            {
              description: "Value",
              name: "LITERAL_VALUE",
              type: InputOptionType.hex_value
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
        
        }
      ]
    },
    {
      languages: {
        assembler: [
          { "children": false, "instruction": "LDR R1,=LITERAL"}
        ]
      },
      title: {
        "de": "Load Value from literal address"
      },
      description: {
        "de": "Loads a Value from a literal"
      },
      acceptsChildren: false
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
    return [
      // {
      //   title: {
      //     en: "While loop",
      //     de: "While Schleife"
      //   },
      //   description: {
      //     de: "Beschreibung",
      //     en: "Description"
      //   },
      //   acceptsChildren: true,
      //   drawing: [
      //     {
      //       rectangle: {
      //         border: {
      //           width: '1px',
      //           color: "#000",
      //           style: BorderStyle.solid
      //         },
      //         left: "0px",
      //         top: "0px",
      //         right: "0px",
      //         bottom: "0px",
      //       }
      //     },
      //     {
      //       rectangle: {
      //         border: {
      //           width: '1px',
      //           color: "#000",
      //           style: BorderStyle.solid
      //         },
      //         left: "20px",
      //         top: "20px",
      //         right: "0px",
      //         bottom: "20px",
      //         acceptsChildren: true,
      //       }
      //     }
      //   ]
      // },
    ];
    // this.httpClient.get<IResponse<IComponent[]>>('/components/').subscribe(
    //   data => {
    //     return data.data;
    //   }
    // )
  }
}
