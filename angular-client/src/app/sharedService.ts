import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs'
//import {author} from './author';

@Injectable()
export class sharedService{
   private messageSource = new BehaviorSubject < any > ([]);
   public currentmessage  = this.messageSource.asObservable(); 
    constructor() {} 
    changemessage(message: any[]): void {   
        this.messageSource.next(message); 
    }
}