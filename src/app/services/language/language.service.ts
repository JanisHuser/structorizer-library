import { Injectable } from '@angular/core';
import { Language } from 'src/app/data/language/language';
import { ITranslation } from 'src/app/data/visual/itranslation';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  selectedLanguage: Language = Language.en;
  constructor() {
    var userLang = navigator.language; 
    // alert(userLang);
  }

  get(text: ITranslation) : string {
    if (text != undefined) {
      switch(this.selectedLanguage) {
        case Language.en: return text.en;
        case Language.de: return text.de;
      } 
    }
    return 'invalid';
  }
}
