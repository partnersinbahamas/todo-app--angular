import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private message$$ = new Subject<string>();
  public message$ = this.message$$.asObservable();

  showMessage(txt: string) {
    this.message$$.next(txt);
  }
}
