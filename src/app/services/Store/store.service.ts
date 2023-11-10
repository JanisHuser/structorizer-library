import { Injectable } from '@angular/core';
import { IInputOption } from 'src/app/data/IInputOption';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  stores: {[store:string]: IInputOption[]} = {};

  constructor() { }

  getOptions(store: string): any[] {
    if (store in this.stores) {
      return this.stores[store].map(x => x.value);
    }
    
    return [];
  }

  addOption(option: IInputOption) {
    if (option.store == null) {
      return;
    }

    const store = option.store!;
    if (!(store in this.stores)) {
      this.stores[store] = []
    }

    const storage = this.stores[store];

    if (storage.includes(option)) {
      return;
    }

    storage.push(option);
  }
}
