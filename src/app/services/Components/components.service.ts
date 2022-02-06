import { Injectable } from '@angular/core';
import { IComponent } from 'src/app/data/icomponent';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IResponse } from 'src/app/data/iresponse';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  headers = new HttpHeaders().set(
    'Content-Type','application/json'
  );

  components = new BehaviorSubject<IComponent[]>([]);
  
  constructor(
    private httpClient: HttpClient
  ) {
    const url = "https://raw.githubusercontent.com/JanisHuser/structorizer-v2-api/main/components.json";
    
    this.httpClient.get<IResponse<IComponent[]>>(url).subscribe({
      next: (v) => {
        if (v.success) {
          this.components.next(v.data);
        }
      },
      error: (e: HttpErrorResponse) => console.error("error",e.message)
    });
  }
  getComponents() : Observable<IComponent[]> {
    return this.components.asObservable();

  }

  getComponent(identifier: string) : IComponent |undefined {
    return this.components.value.find(x => x.identifier == identifier);
  }


}
