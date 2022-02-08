import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAuthor } from 'src/app/data/document/iauthor';
import { IDocument } from 'src/app/data/document/idocument';
import { IPage } from 'src/app/data/document/ipage';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  document = new BehaviorSubject<IDocument>(
    {
      title: "",
      description: "",
      pages: [],
      createdOn: new Date(),
      author: {
        username: "username"
      }
    }
  );

  activePage: IPage | undefined = undefined;

  getDocument() : Observable<IDocument> {
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

    if (this.document.value.pages.length == 1) {
      this.setActivePage(this.document.value.pages[0]);
    }
  }

  setActivePage(page: IPage) {
    this.activePage = page;
  }
  getActivePage() : IPage|undefined  {
    return this.activePage;
  }

  removePage(page: IPage) {
    if (this.document.value.pages.includes(page)) {
      let index = this.document.value.pages.indexOf(page);
      this.document.value.pages.splice(index,1);

      index--;
      if (index < 0) {
        index = 0;
      }
      if (this.document.value.pages.length > index) {
        this.setActivePage(this.document.value.pages[index]);
      }     
    }
  }

  constructor() {

    let page: IPage = {
      title: "main",
      structure: {
        identifier: "main-structure",
        children: [],
        properties: new Map<string,any>()
      },
      createdOn: new Date()
    }
    this.addPage(page);

    this.setActivePage(page);
  }
}
