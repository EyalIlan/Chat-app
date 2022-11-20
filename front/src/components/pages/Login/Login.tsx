import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios';
import { useDispatch } from 'react-redux'
import { saveUser, saveToken } from '../../../util/store/reducers/user'
import './Login.css'



type Props = {
  title: string
  signup?: boolean
}


const Login: React.FC<Props> = ({ title, signup }) => {


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [RePassword,SetRePassword] = useState('')
  const [age,SetAge] = useState(0)
  const [username,SetUserName] = useState('')

  const [userAvatar,SetUserAvatar] = useState<any>()
  const [PrevieAvatar,SetPreviewAvatar] = useState<string>()

  const [Error, SetError] = useState('')
  const [showError, SetShowError] = useState(false)
  


  const LoginHandler = async () => {

    try {
      const reqeust = await Axios.post('http://localhost:5000/login', { email, password })
      dispatch(saveUser(reqeust.data.user))
      dispatch(saveToken(reqeust.data.token))
      navigate('/chat')
    }
    catch (e: any) {
      console.log(e);

      SetError(e.message)
      
      SetShowError(true)
    }


  }
//
//
useEffect(() =>{

  if(userAvatar){
    const reader = new FileReader();
    
    reader.onloadend = () =>{
      SetPreviewAvatar(reader.result as string)
    }
    reader.readAsDataURL(userAvatar)
    
  }else{
    SetPreviewAvatar(undefined)  
  }

},[userAvatar])

  const SignUpUserHandler = async() =>{
    if(password !== RePassword || password.length < 5){
      SetShowError(true)
      SetError('password and RePassword need to be equal')
      return
    }
   


    try {

        const responce = await Axios.post('http://localhost:5000/user', { email, password,age,name:username,avatar:PrevieAvatar})  
        navigate('/')
    }
    catch(e){
      
      console.log(e);
      

      SetShowError(true)
      SetError('Error trying sign up')
    }

  }


  const imageUploadHandler = (e:any) =>{

    const file = e.target.files[0]

      if(file && file.type.substr(0,5) === "image"){
        SetUserAvatar(file)
      }else{
        SetUserAvatar(undefined)
      }

  }

  let errorMessage = (
    <div className='p-3 mb-2 bg-danger text-white'>
      <p>
        {Error}
      </p>
    </div>
  )

  return (
    <div>
      <div className='screen'>
        <div className='form'>
      
         {signup?<>
         <div className='flex flex-column'>
            <img src={PrevieAvatar?`${PrevieAvatar}`:"./images/avatarImage.png"} alt="" />
            <div className='flex flex_1 center justify-content-center'>
              <label htmlFor="Userfile" className='btn btn-dark btn-lg'>Choose user avatar</label>
              <input type="file" name="file" id='Userfile' accept='image/*'  onChange={(e) => {imageUploadHandler(e)}} />
            </div>
          </div>
            </> :''
          }
          <div>
          <h1>{title}</h1>
            <div>
          {showError ? errorMessage : ''}

          {signup? <div> <div>
            <label htmlFor="username">Username</label>
            </div>
            <input type="text" name="username" id='username' onChange={(e) => { SetUserName(e.target.value)}} /></div>:''}

            <label htmlFor="email">Email</label>
            </div>
              <input type="text" name="email" id='email' onChange={(e) => { SetEmail(e.target.value) }} />
            <div>
            <label htmlFor="password">Password</label>
            </div>
            <input type="text" name="password" id='password' onChange={(e) => { SetPassword(e.target.value) }} />
          {signup ?<div> 
            <div>
            <label htmlFor="password">RePassword</label>
            </div>
            <input type="text" name="password" id='password' onChange={(e) => { SetRePassword(e.target.value) }} />
            <div>
            <label htmlFor="age">Age</label>
            </div>
            <input type="number" name="age" id='age' onChange={(e) => { SetAge(parseInt(e.target.value))}} />
                </div>
             : ''}
            <div className='flex between'>
            {/* <button className='btn btn-primary' onClick={signup? :LoginHandler}>Login</button> */}
            <button className='btn btn-primary' onClick={signup?() =>{navigate('/')}:LoginHandler}>{signup? "Login page":"Login"}</button>
            <button className='btn btn-primary' onClick={signup?SignUpUserHandler:() =>{navigate('/signup')}}>{signup? "Sign up":"Sign up page"}</button>
          </div>
        </div>
        </div>
        
      </div>
    </div>
  )
}

export default Login