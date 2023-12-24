import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

   currentPage = new BehaviorSubject<string>('');
   currentPageSource$  = this.currentPage.asObservable();

   title = '';
   setCurrentPage(name  : string){
    this.title = name;
      this.currentPage.next(name);
   }
   getCurrentPageName(){
    return this.title;
   }
   
}
