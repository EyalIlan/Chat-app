import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Axios from '../../../util/Axios/axios';
import { useDispatch, useSelector } from 'react-redux'
import { saveUser, saveToken } from '../../../util/store/reducers/user'
import { showModal,ChangeModalShowing } from '../../../util/store/reducers/feature'
import './Login.css'
import { UserIF } from '../../../util/interface/interface';
import Modal from '../../UI/modal/modal';


type Props = {
  title: string
  signup?: string

}


const Login: React.FC<Props> = ({ title, signup }) => {


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const ShowModal = useSelector(showModal)


  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [RePassword, SetRePassword] = useState('')
  const [age, SetAge] = useState(0)
  const [username, SetUserName] = useState('')


  const [roomtitle,SetRoomTitle] = useState('')
  const [users,SetUsers] = useState<UserIF []>([])


  const [userAvatar, SetUserAvatar] = useState<any>()
  const [PrevieAvatar, SetPreviewAvatar] = useState<string>()

  const [Error, SetError] = useState('')
  const [showError, SetShowError] = useState(false)



  const LoginHandler = async () => {

    try {
      const reqeust = await Axios.post('/login', { email, password })
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
  useEffect(() => {

    if (userAvatar) {
      const reader = new FileReader();

      reader.onloadend = () => {
        SetPreviewAvatar(reader.result as string)
      }
      reader.readAsDataURL(userAvatar)

    } else {
      SetPreviewAvatar(undefined)
    }

  }, [userAvatar])

  const SignUpUserHandler = async () => {
    if (password !== RePassword || password.length < 5) {
      SetShowError(true)
      SetError('password and RePassword need to be equal')
      return
    }


    try {

      const responce = await Axios.post('/user', { email, password, age, name: username, userImage: PrevieAvatar })
      navigate('/')
    }
    catch (e) {

      console.log(e);


      SetShowError(true)
      SetError('Error trying sign up')
    }

  }


  const imageUploadHandler = (e: any) => {

    const file = e.target.files[0]

    if (file && file.type.substr(0, 5) === "image") {
      SetUserAvatar(file)
    } else {
      SetUserAvatar(undefined)
    }

  }


  const openModalUsersHandler = async() =>{
    
    
    if(users.length === 0){
        try{
          const request = await Axios.get('/user/allusers')
          console.log(request.data);
          SetUsers(request.data)
        }
        catch(e){
          console.log(e);
        }
        
    }
    dispatch(ChangeModalShowing(true))
  }


  let errorMessage = (
    <div className='p-3 mb-2 bg-danger text-white'>
      <p>
        {Error}
      </p>
    </div>
  )
    console.log(ShowModal);
    
  return (
    <div>
      <div className='screen'>
       {ShowModal? <Modal users={users}></Modal>:''}
        <div className='form form_padding flex justify-content-between'>

          {signup === "room" || signup === "user" ? <>
            <div className='flex flex-column form_padding'>


              <div className='flex_1'>
                <img id='form_image' src={PrevieAvatar ? `${PrevieAvatar}` : "./images/avatarImage.png"} alt="" />
              </div>

              <div className='flex  center justify-content-center'>
                <label htmlFor="Userfile" className='btn btn-dark btn-lg flex_1'>Choose user avatar</label>
                <input type="file" name="file" id='Userfile' accept='image/*' onChange={(e) => { imageUploadHandler(e) }} />
              </div>
            </div>
          </> : ''
          }
          <div className='flex flex-column justify-content-around flex_1'>
            <h1>{title}</h1>


            {
              signup === "room" ?
                <div className='flex_1 '>
                  <div className='flex justify-content-between'>
                    <label htmlFor="newRoom"><h4>Room Title </h4></label>
                    <button className='btn btn-primary' onClick={openModalUsersHandler}>add users</button>
                  </div >
                  <div className='flex'>
                    <input type="text" name="newRoom" id='newRoom' className='flex_1' onChange={(e) => { SetRoomTitle(e.target.value) }} />
                  </div>
                  
                  <div className='container'>
                      <div className='row'>
                            {}
                      </div>
                  </div>
                </div>
                : ''}

            <div>
              {showError ? errorMessage : ''}


              {
                signup === "user" ?
                  <>
                    <div>
                      <label htmlFor="username">Username</label>
                    </div>
                    <input type="text" name="username" id='username' onChange={(e) => { SetUserName(e.target.value) }} />
                  </>
                  : ''
              }
              {signup === "user" || signup === undefined ?
                <>
                  <div>
                    <label htmlFor="email">Email</label>
                  </div>
                  <input type="text" name="email" id='email' onChange={(e) => { SetEmail(e.target.value) }} />
                  <div>
                    <label htmlFor="password">Password</label>
                  </div>
                  <input type="text" name="password" id='password' onChange={(e) => { SetPassword(e.target.value) }} />
                </>
                : ''
              }


              {
                signup === "user" ?
                  <div>
                    <div>
                      <label htmlFor="password">RePassword</label>
                    </div>
                    <input type="text" name="password" id='password' onChange={(e) => { SetRePassword(e.target.value) }} />
                    <div>
                      <label htmlFor="age">Age</label>
                    </div>
                    <input type="number" name="age" id='age' onChange={(e) => { SetAge(parseInt(e.target.value)) }} />
                  </div>
                  :
                  ''
              }
              <div className='flex between'>
                {signup === "user" || signup === undefined ?
                  <>
                    <button className='btn btn-primary' onClick={signup ? () => { navigate('/') } : LoginHandler}>{signup ? "Login page" : "Login"}</button>
                    <button className='btn btn-primary' onClick={signup ? SignUpUserHandler : () => { navigate('/signup') }}>{signup ? "Sign up" : "Sign up page"}</button>
                  </>
                  : ''}
                {signup === "room" ?
                  <>
                    <button className='btn btn-primary'>create new room</button>
                    <button className='btn btn-primary' onClick={() => { navigate('/chat') }}>Cancel</button>
                  </>
                  : ''}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login