import React from 'react'
import './modal.css'
import {useDispatch} from 'react-redux'
import {ChangeModalShowing} from '../../../util/store/reducers/feature'
import { UserIF } from '../../../util/interface/interface'

interface Props  {
    grid?:boolean,
    users?:UserIF[]
}
const Modal:React.FC<Props> = ({users}) => {
    

    const dispatch = useDispatch()

    const closeModalHandler = () =>{

       dispatch(ChangeModalShowing(false))
        
    }
    
    return (
        <div className='Modal flex justify-content-center align-items-center'>
            
           <div id='modal' className='form scroll bg-black'>
             <div className=''>
                
                <div className='chat_userbox flex  align-items-center justify-content-end'>
                        <i className="fa-sharp fa-solid fa-xmark logo" onClick={closeModalHandler}></i>
                </div>

            {users?users.map((p,index)=>{
                return <div key={index}>
                    <div className='chat_userbox'>
                        <div>
                            <div className='flex  align-items-center justify-content-between'>
                            <p>date</p>
                            <h5>{p.name}</h5>
                            </div>
                            <p>hello world</p>
                       </div>
                     
                       <img src={p.image?p.image:"/images/happiness.png"}  alt="user Image" />
                    </div>
                     <hr />
                </div>
                }):''}
                    
              </div>
            </div>
        </div>
    )
}
 
export default Modal