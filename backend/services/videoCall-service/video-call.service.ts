import { Injectable } from '@angular/core';
// import {WebSocketSubject} from 'rxjs/internal-compatibility'

export const WS_ENDPOINT = 'ws://localhost:8081'

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {

  constructor() { }
}
