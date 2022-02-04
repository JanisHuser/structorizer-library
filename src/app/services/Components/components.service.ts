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
                width: "1px",
                color: "black",
                style: BorderStyle.solid
              },
              x: "0%",
              y: "0%",
              width: "100%",
              height: "100%"
            }
          },
          {
            rectangle: {
              border: {
                width: "1px",
                color: "black",
                style: BorderStyle.solid
              },
              x: "20%",
              y: "20%",
              height: "60%",
              width: "80%",
              acceptsChildren: true
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
