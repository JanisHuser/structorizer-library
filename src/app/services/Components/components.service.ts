import { Injectable } from '@angular/core';
import { IComponent } from 'src/app/data/icomponent';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResponse } from 'src/app/data/iresponse';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {


  headers = new HttpHeaders().set(
    'Content-Type','application/json'
  );
  
  constructor(
    private httpClient: HttpClient
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
              color: "red",
              x: 0,
              y: 0,
              width: "100%",
              height: "100%"
            }
          }
        ]
        
      }
    ];
    this.httpClient.get<IResponse<IComponent[]>>('/components/').subscribe(
      data => {
        return data.data;
      }
    )
  }
}
