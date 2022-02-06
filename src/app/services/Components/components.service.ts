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

  components: IComponent[] = [];
  
  constructor(
    private httpClient: HttpClient
  ) {
  
    
  }

  getComponents() : IComponent[] {

    // return [
    //   {
    //     title: {
    //       en: "While loop",
    //       de: "While Schleife"
    //     },
    //     description: {
    //       de: "Beschreibung",
    //       en: "Description"
    //     },
    //     acceptsChildren: true,
    //     drawing: [
    //       {
    //         rectangle: {
    //           border: {
    //             width: '1px',
    //             color: "#000",
    //             style: BorderStyle.solid
    //           },
    //           left: "0px",
    //           top: "0px",
    //           right: "0px",
    //           bottom: "0px",
    //         }
    //       },
    //       {
    //         rectangle: {
    //           border: {
    //             width: '1px',
    //             color: "#000",
    //             style: BorderStyle.solid
    //           },
    //           left: "20px",
    //           top: "20px",
    //           right: "0px",
    //           bottom: "20px",
    //           acceptsChildren: true,
    //         }
    //       }
    //     ],
    //     identifier: "while-loop"
    //   },
    //   {
    //     title: {
    //       en: "Do-While Loop",
    //       de: "Do-While Loop"
    //     },
    //     description: {
    //       en:"Beschreibung",
    //       de:"Beschreibung"
    //     },
    //     acceptsChildren: true,
    //     drawing: [
          
    //     ],
    //     identifier: "do-while-loop"
    //   },
     
      
    // ];
    const url = "https://raw.githubusercontent.com/JanisHuser/structorizer-v2-api/main/components.json";
    this.httpClient.get<IComponent[]>(url).subscribe(
      data => {
        this.components = data;
      }
    )

    return this.components;
  }

  getComponent(identifier: string) : IComponent |undefined {
    return this.components.find(x => x.identifier == identifier);
  }


}
