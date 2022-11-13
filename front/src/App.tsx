import React from 'react';
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css';
import io from 'socket.io-client'
import Chat from './components/pages/Chat/chat';
import Login from './components/pages/Login/Login';
const socket = io('http://localhost:5000') 


function App() {


  
  return (
    <BrowserRouter>
    <div className="App"> 
      <Routes>
          <Route path='/' element={
            <Login/>
          }>

        </Route>
          <Route path='/chat' element={<Chat socket ={socket}/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>

);
}

export default App;



// const JoinChatRoomHandler = () =>{

//   if(room === '' || name ===''){
//     SetShowError(true)
//     SetErrorMessage('Username and room must both have value')
//     return
//   }
//   socket.emit('join_room',{username:name,roomId:room})
//   SetShowChat(true)
// }