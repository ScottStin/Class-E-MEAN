import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

export const WS_ENDPOINT = 'ws://localhost:8081'

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {

  private socket$?: WebSocketSubject<{}>;
  private messagesSubject = new Subject<{}>();
  public messages$ = this.messagesSubject.asObservable();

  constructor() { }

  public connect():void{
    this.socket$=this.getNewWebSocket();
  }

  sendMessage(msg:any): void{
    console.log('sending message: '+msg);
    this.socket$?.next(msg);
  }

  private getNewWebSocket(): WebSocketSubject<any>{
    return webSocket({
      url: WS_ENDPOINT,
      openObserver: {
        next: () => {
          console.log('DataService:connection OK');
        }
      },
      closeObserver: {
        next: () => {
          console.log('DataService:connection lost');
          this.socket$ = undefined;
          this.connect();
        }
      }
    })
  }
  

}
