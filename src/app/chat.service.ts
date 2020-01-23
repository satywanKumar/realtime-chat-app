import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable,Observer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }
  private socket = io('https://satywan-chat.herokuapp.com');

  joinMeeting(data)
  {
    this.socket.emit('join',data);
  }

  leaveMeeting(data)
  {
    this.socket.emit('left',data);
  }

  newUserJoined()
  {
    let observable = new Observable<{userName:String,message:String}>(observer=>{
      this.socket.on('new user joined',(data)=>{
        observer.next(data);
      });
      return ()=>{this.socket.disconnect();}
    });

    return observable;
  }

  userleft()
  {
    let observable = new Observable<{userName:String,message:String}>(observer=>{
      this.socket.on('user left',(data)=>{
        observer.next(data);
      });
      return ()=>{this.socket.disconnect();}
    });

    return observable;
  }

  sendMessage(data)
  {
    this.socket.emit('message',data);
  }

  newMessageRecieved()
  {
    let observable = new Observable<{userName:String,message:String}>(observer=>{
      this.socket.on('new message',(data)=>{
        observer.next(data);
      });
      return ()=>{this.socket.disconnect();}
    });

    return observable;
  }

  typing(data)
  {
    this.socket.emit('typing message',data);
  }

  typingMessage()
  {
    let observable = new Observable<{userName:String,message:String}>(observer=>{
      this.socket.on('typing',(data)=>{
        observer.next(data);
      });
      return ()=>{this.socket.disconnect();}
    });

    return observable;
  }


  
}
