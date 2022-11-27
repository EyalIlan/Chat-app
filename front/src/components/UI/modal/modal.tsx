import React from 'react'
import './modal.css'
import {useDispatch} from 'react-redux'
import {ChangeModalShowing} from '../../../util/store/reducers/feature'

type Props = {}

const Modal = (props: Props) => {
    

    const dispatch = useDispatch()

    const closeModalHandler = () =>{

       dispatch(ChangeModalShowing(false))

    }
    
    return (
        <div className='Modal flex justify-content-center align-items-center'>
            
            <div id='modal' className='form scroll'>
                <div className='bg-black'>
                
                <div className='chat_userbox flex  align-items-center justify-content-end'>
                        <i className="fa-sharp fa-solid fa-xmark logo" onClick={closeModalHandler}></i>
                </div>
               
                  </div>
            </div>

        </div>
    )
}
 
export default Modal