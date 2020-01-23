import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { JoinChatComponent } from './join-chat/join-chat.component';


const routes: Routes = [
  {path:'chat',component:ChatPageComponent},
  {path:'join-chat',component:JoinChatComponent},
  {path:'',component:JoinChatComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
