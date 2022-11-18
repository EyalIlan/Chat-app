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
    console.log('in send message');
    
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



  const  ChangeRoom = async(newRoom:string) =>{
    
    
    socket.emit('join_room',{roomId:newRoom,oldRoom:currentRoom,username:user.name})
    SetCurrentRoom(newRoom)
    try{
      const {data} = await Axios.get(`/message?room=${newRoom}`,{headers: { 'Authorization': `Bearer ${token}`}})
      SetMessagesList(data)
      
    }
    catch(e){
      
    }
  
  }                
  console.log(messagesList);
  

  return (
    <div>
    <div className='chat'>
    <Navbar></Navbar>
    <div className='container'>
    <div className='row' id='chat_height'>
      
      <div className='col-md flex flex-column border_right'>
        <div className='Container content'>
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
      <div className='flex around center lower_bar'>
          <img src="/images/defaultuser.png" className='logo click'  alt="" />
          <input type="text" className='full_width' placeholder='type message' onChange={(e) =>{SetMessage(e.target.value)}} />
          <button  className='btn btn-outline-dark'  onClick={SendMessageHandler} disabled={sendButton}> <i className="fa-solid fa-paper-plane logo_cdn click"></i></button>
          <i className="fa-regular fa-face-smile logo_cdn click"></i>
      </div>

      </div>
      <div className='col-md-4 bg-dark scroll'>
      
              {rooms.map((p:any) =>{

                return(
                  <div>
                  <div  className='chat_userbox' onClick={() =>{ChangeRoom(p.name)}}>
                  <div>
                    <div className='chat_userbox_title'>
                        <p>date</p> 
                        <h5>{p.name}</h5>
                    </div>
                    <p>{messagesList.length > 0? messagesList[messagesList.length-1].message: 'hell world'}</p>
                  </div>
               
                 <img src="/images/avatar.jpg" style={{'backgroundColor':''}} alt="" />
                 </div>
                 <hr />
                 </div>
                )
                
              })}
       
      
      
          </div>
          </div>
        </div>
        </div>
      </div>
  )
}

export default Chat

// test@gmail.com
// test2@gmail.com




