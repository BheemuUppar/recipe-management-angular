import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }
  isLoading =  new Subject<boolean>();
 isLoadingSource = this.isLoading.asObservable()
 show(){
  this.isLoading.next(true);
 }
 hide(){
  this.isLoading.next(false);
 }
  isLoadings(){
    return  this.isLoading
  }


}
