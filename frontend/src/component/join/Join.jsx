import React, { useState } from 'react'
import "./Join.css"
import logo from "../../images/logo.png"
import { Link } from 'react-router-dom'


let user;
const Join = () => {

const sendUser=()=>{
   user= document.getElementById('joinInput').value;
   localStorage.user=user;
   document.getElementById('joinInput').value="";
}

const [name, setname] = useState("")
console.log(name)
  return (
    <div className="joinPage">
        <div className="JoinContainer">
            <img src={logo} alt="logo"/>
               <h1> Hi Chat</h1>
               <input onChange={(e)=>setname(e.target.value) } placeholder='Enter your name' type="text" id="joinInput"/>
               <Link onClick={(event)=>!name ?event.preventDefault():null} to="/chat"><button onClick={sendUser} className='joinbtn'>Login</button></Link>

        </div>
        
    </div>
  )
}

export default Join
export {user}