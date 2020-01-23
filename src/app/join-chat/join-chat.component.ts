import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-join-chat',
  templateUrl: './join-chat.component.html',
  styleUrls: ['./join-chat.component.css']
})
export class JoinChatComponent implements OnInit {

  messageArray:any[]=[];

  constructor(public chatService:ChatService,
              public router:Router) { 
    // this.chatService.newUserJoined().subscribe(data=>{
    //   this.messageArray.push(data);
    //   console.log(this.messageArray);

    // })
  }

  user = {
    userName:'',
    meetingId:''
  }

  ngOnInit() {
  }

  joinButtonClick()
  {
    console.log(this.user);
    this.chatService.joinMeeting(this.user);
    sessionStorage.setItem('userName',this.user.userName);
    sessionStorage.setItem('meetingId',this.user.meetingId);
    this.router.navigate(['/chat']);
  }

}
