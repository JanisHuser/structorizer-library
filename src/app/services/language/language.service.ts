import { Injectable } from '@angular/core';
import { ILanguage } from 'src/app/data/language/ilanguage';
import { Language } from 'src/app/data/language/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  selectedLanguage: Language = Language.en;
  constructor() {
    var userLang = navigator.language; 
    alert(userLang);
  }

  get(text: ILanguage) : string {
    if (text != undefined) {
      switch(this.selectedLanguage) {
        case Language.en: return text.en;
        case Language.de: return text.de;
      } 
    }
    return 'invalid';
  }
}
