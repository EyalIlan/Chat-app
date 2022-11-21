import React from 'react'
import './navbar.css'
import {useSelector} from 'react-redux'
import { UserData } from '../../../util/store/reducers/user'

type Props = {}

const Navbar: React.FC<Props> = (props) => {
    
    const user  = useSelector(UserData)
    

    console.log(user.image);
    

    return (
        <div >

            <div id='navbar' className='bg-primary '>
                <div className='container'>
                    <div className='row'>

                        <div className='col-md flex center between border_right'>
                            <div className='flex center'>
                                <i className="fa-solid fa-ellipsis-vertical logo_cdn click"></i>
                                <i className="fa-solid fa-magnifying-glass logo_cdn click"></i>
                            </div>
                            <div className='flex center'>
                                <div className='message_box'>
                                    <h3>חן</h3>
                                    <p>חןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןן</p>
                                </div>
                                <img src="images/defaultuser.png" alt="" className='avatar' />
                            </div>

                        </div>

                        <div className='menu_space col-md-4 flex center between'>


                        <div>
                            <i className="fa-solid fa-ellipsis-vertical logo_cdn click"></i>
                            <i className="fa-brands fa-rocketchat logo_cdn click"></i>
                            {/* <img src="images/charmander.png" alt="" className='logo click' /> */}
                         </div>

                        <div className='flex center'>
                                <h2>{user.name}</h2>
                                <img src={user.image?user.image:"images/defaultuser.png"} alt="" className='avatar' />
                        </div>
                        

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Navbar