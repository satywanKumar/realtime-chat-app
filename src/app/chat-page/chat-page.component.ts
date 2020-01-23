import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  messageArray:any[]=[];
  textMessage:String = '';
  typingMsg:any ={};

  constructor(public chatService:ChatService,
              public router:Router) { 
    this.chatService.newUserJoined().subscribe(data=>{
      this.messageArray.push(data);
      console.log(this.messageArray);

    });

    this.chatService.userleft().subscribe(data=>{
      this.messageArray.push(data);
      console.log(this.messageArray);
    });

    this.chatService.newMessageRecieved().subscribe(data=>{
      this.messageArray.push(data);
      console.log(this.messageArray);
    });

    this.chatService.typingMessage().subscribe(name=>{
      console.log(name);
      this.typingMsg = name;
    })

  }

  leaveMeeting()
  {
    this.chatService.leaveMeeting({userName:sessionStorage.getItem('userName'),meetingId:sessionStorage.getItem('meetingId')});
    this.router.navigate(['']);
  }

  sendMessage()
  {
    this.chatService.sendMessage({userName:sessionStorage.getItem('userName'),meetingId:sessionStorage.getItem('meetingId'),message:this.textMessage});
    this.textMessage = '';
    this.typingMsg = {};
  }

  typing()
  {
    console.log(this.textMessage);
    this.chatService.typing({userName:sessionStorage.getItem('userName'),meetingId:sessionStorage.getItem('meetingId')});
  }


  ngOnInit() {
  }

}
