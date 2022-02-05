import { Injectable } from '@angular/core';
import { IComponent } from 'src/app/data/icomponent';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResponse } from 'src/app/data/iresponse';
import { BorderStyle } from 'src/app/data/drawing/border-style';

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

    return [
      {
        title: "While Schleife",
        "description": "description",
        acceptsChildren: true,
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
            rectangle: {
              border: {
                width: '1px',
                color: "#000",
                style: BorderStyle.solid
              },
              left: "20px",
              top: "20px",
              right: "0px",
              bottom: "20px",
              acceptsChildren: true,
            }
          }
        ]
        
      }
    ];
    // this.httpClient.get<IResponse<IComponent[]>>('/components/').subscribe(
    //   data => {
    //     return data.data;
    //   }
    // )
  }
}
