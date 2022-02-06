import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Document } from 'src/app/data/document/document';
import { IAuthor } from 'src/app/data/document/iauthor';
import { IPage } from 'src/app/data/document/ipage';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  document = new BehaviorSubject<Document>(
    new Document()
  );

  getDocument() : Observable<Document> {
    return this.document.asObservable();
  }

  setTitle(title: string) {
    this.document.value.title = title;
  }
  
  setDescription(description: string) {
    this.document.value.description = description;
  }

  setAuthor(author: IAuthor) {
    this.document.value.author = author;
  }


  addPage(page: IPage) {
    this.document.value.pages.push(page);
  }

  constructor() { }
}
