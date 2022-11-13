import React,{ useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import  Axios  from 'axios';
import {useDispatch} from 'react-redux'
import {saveUser,saveToken} from '../../../util/store/reducers/user'
import './Login.css'



type Props = {


}


const Login:React.FC<Props> = (props) => {
    

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email,SetEmail] = useState('')
  const [password,SetPassword] = useState('')
  const [Error,SetError] = useState('')
  const [showError,SetShowError] = useState(false)


  const LoginHandler = async() =>{

    try{
        const reqeust = await Axios.post('http://localhost:5000/login',{email,password})
        dispatch(saveUser(reqeust.data.user))
        dispatch(saveToken(reqeust.data.token))
        navigate('/chat')
    }
    catch(e:any){
        console.log(e);
        
        SetError(e.message)
        SetShowError(true)
    }


  }


  let errorMessage =  (
    <div className='error_message'>
            <p>
                {Error}
            </p>
    </div>
  )

  return (
    <div>
        <div className='screen'>
            <div className='form'>
                <h1>Login</h1>
                <div>
                {showError?errorMessage:''}
                <label htmlFor="email">Email</label>
                </div>
                <input type="text" name="email" id='email' onChange={(e) =>{SetEmail(e.target.value)}}/>
                <div>
                <label htmlFor="email">Password</label>
                </div>
                <input type="text" name="password" id='password' onChange={(e) =>{SetPassword(e.target.value)}}/>
                <div>
                    <button className='btn btn-primary' onClick={LoginHandler}>Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login