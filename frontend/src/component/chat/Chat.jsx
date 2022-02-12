import React, { useEffect } from 'react'
import {user} from '../join/Join'
import socketIo from 'socket.io-client';
import './Chat.css';
import sendLogo from "../../images/send.png"
import { useState } from 'react';
import Message from '../message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom";
import Close from "../../images/closeIcon.png"
import logo2 from "../../images/logo2.png"

let socket;
const ENDPOINT = 'https://hii-chat.herokuapp.com/' 
const ENDPOINTDEVELOPMENT = "http://localhost:4500/";

const Chat = ()=> {
    const [id, setid] = useState("")
    const [messages, setmessages] = useState([])

    const send=()=>{
        const message = document.getElementById('chatInput').value;
        socket.emit('message',{message,id});
          document.getElementById('chatInput').value="";

    }
   
    useEffect(() => {
    socket = socketIo(ENDPOINT,{transports:['websocket']});

    socket.on('connect',()=>{
        setid(socket.id);
    })
    console.log(socket)
    socket.emit('joined',{user: user? user:localStorage.user })


    socket.on('welcome',(data)=>{
        setmessages([...messages, data])
        console.log(data.user,data.message)
    })

    socket.on('userjoined',(data)=>{
        setmessages([...messages, data])
           console.log(data.user,data.message)
    })

    socket.on(`leave`,(data)=>{
        setmessages([...messages, data])
        console.log(data.user,data.message)
    })

    socket.on('message',()=>{

    })
   
     return () => {
         socket.emit('disconnect');
         socket.off()
       
     }
   }, [])
   useEffect(() => {
     socket.on('sendMessage',(data)=>{
        setmessages([...messages, data])
         console.log(data.user,data.message,data.id);
     })
   
     return () => {
         socket.off()
       
     }
   }, [messages])
   
   
  return (
    <div className='chatPage'>
        <div className='chatContainer'>
            <div className='header'>
                    <img src={logo2} alt="logo2" />        
                <p> {`Hi ${user?user:localStorage.user}`}</p>
                <a href='/'><img src={Close} alt="close" /></a>
            </div>
            <ReactScrollToBottom className='chatBox'>
                 {messages.map((item,i)=><Message user={item.id===id ? '' : item.user} message={item.message} classs={item.id===id? 'right':'left'}/>)}
            </ReactScrollToBottom>
            <div className='inputBox'>
                <input  onKeyPress={(event)=>event.key==='Enter'? send() :null}  placeholder="Type a message" type="text" id="chatInput"/>
                <button onClick={send} className='sendBtn'>
                    <img src={sendLogo} alt="send"/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Chat
