import Axios from '../../../util/Axios/axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import {  Token,UserData } from '../../../util/store/reducers/user';
import {useNavigate} from 'react-router-dom'
// import { UserIF } from '../../../util/interface/interface'
import './chat.css'
import Navbar from '../../UI/navbar/navbar';



type Props = {
  socket: any
}

interface Message {
  message: string
  name: string,
  time: string
}

const Chat: React.FC<Props> = ({socket}) => {



  const navigate = useNavigate()

  
  const [messagesList, SetMessagesList] = useState<Message[]>([])
  const [message, SetMessage] = useState('')
  const [sendButton, SetSendButton] = useState(false)
  const [rooms, Setrooms] = useState([])
  const [currentRoom,SetCurrentRoom] = useState('')
  // const [users, SetUsers] = useState<UserIF[]>([])
  const user = useSelector(UserData)
  const token = useSelector(Token)




  useEffect(() => {

    socket.on('receive_message', (data: Message) => {
      SetMessagesList((prev) => [...prev, data])
    })


    return () => socket.off('receive_message')

  }, [socket])


 
  useEffect(() => {

    if(!token){
      navigate('/')
    }

    const request = async () => {

      try {
        const {data} = await Axios.get('/room/rooms', {headers: { 'Authorization': `Bearer ${token}`}})
        Setrooms(data)
      }
      catch (e) {
        console.log(e);
      }
    }
    request()
  }, [token])


// Functions

  const SendMessageHandler = async () => {

    SetSendButton(true)


    if (message === '') {
      SetSendButton(false)
      return
    }

    const messageData = {
      room: currentRoom,
      name: user.name,
      message: message,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    }

    try{

      
      await socket.emit('send_message', messageData, () => {
        SetSendButton(false)
      }) 
      await  Axios.post('/message',messageData,{headers: { 'Authorization': `Bearer ${token}`}})
    }
    catch(e){
      console.log(e);
      
    }
      SetMessagesList((prev) => [...prev, messageData])
      SetMessage('')

  }



  const   ChangeRoom = async(newRoom:string) =>{
    
    
    socket.emit('join_room',{roomId:newRoom,oldRoom:currentRoom,username:user.name})
    
    SetCurrentRoom(newRoom)
    try{
      const {data} = await Axios.get(`/message?room=${newRoom}`,{headers: { 'Authorization': `Bearer ${token}`}})
      SetMessagesList(data)
      
    }
    catch(e){
      
    }
  
  }                


  return (
    <div>
    <Navbar></Navbar>
    <div className='chat'>
      <div>
        <div id='messages_space'>
          {messagesList.map((p,index) => {
            return (
              <div key={index} className={p.name === user.name ? 'message_container left' : 'message_container right'}>
                <div className='message'>
                  <div>
                    <h4>{p.name}</h4>
                    <h4>{p.time}</h4>
                  </div>
                  <p>
                    {p.message}
                  </p>
                </div>
              </div>

            )
          })}
        </div>
      

      </div>
      <div className='chat_users_boxes scroll'>
      {
        rooms.map((p:any,index) =>{
          return(
            <div key={index} className='chat_userbox' onClick={() =>{ChangeRoom(p.name)}}>
             
            <div>
              <div className='chat_userbox_title'>
                <p>{p.date}</p> 
                  <h5>{p.name}</h5>
              </div>
              <p>{messagesList.length > 0? messagesList[messagesList.length-1].message: ''}</p>
            </div>
         
           <img src={p.avatar?p.avatar:"/images/defaultuser.png"} style={{'backgroundColor':'white'}} alt="" />
         
            {/* <hr /> */}
           </div>
          )
        })
      }
      
       
      </div>
      
      </div>
      </div>
  )
}

export default Chat

// test@gmail.com



// <div  className='chat_userbox'>
             
// <div>
//   <div className='chat_userbox_title'>
//     {/* date */}
//     <p>date</p> 
//     <h5>שניר</h5>
//   </div>
//   {/* text */}
//   {/* <p>{Text}</p> */}
//   <p>טוב אז תעקוב אחרי זה מקווה שיעבור לה מהר</p>
// </div>

// {/* need to get the image avatar */}
// <img src="/images/defaultuser.png" style={{'backgroundColor':'white'}} alt="" />

// {/* <hr /> */}
// </div>
// <hr />
// <div  className='chat_userbox'>

