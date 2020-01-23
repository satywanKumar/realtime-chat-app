const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http);

app.use(cors);

io.on('connection',(socket)=>{
    console.log('a new user connected');

    socket.on('join',(data)=>{
        console.log(data);
        socket.join(data.meetingId);
        console.log(data.userName+' joined');
        socket.broadcast.to(data.meetingId).emit('new user joined',{userName:data.userName,message:'joined the meeting'});
    })

    socket.on('left',(data)=>{
      
       
        console.log(data.userName+' left');
        socket.broadcast.to(data.meetingId).emit('user left',{userName:data.userName,message:'has left the meeting'});

        socket.leave(data.meetingId);
    });

    socket.on('message',(data)=>{
        io.in(data.meetingId).emit('new message',{userName:data.userName,message:data.message});
    })

    socket.on('typing message',(data)=>{
        console.log('typing event');
        socket.broadcast.to(data.meetingId).emit('typing',{msg:data.userName + ' is typing...'});
    });


})



http.listen(3000,()=>console.log('app is running 3000'));

