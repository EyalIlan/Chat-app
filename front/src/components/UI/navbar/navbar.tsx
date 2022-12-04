import React from 'react'
import './navbar.css'
import { useSelector, useDispatch } from 'react-redux'
import { UserData } from '../../../util/store/reducers/user'
import { RoomInfo, RoomUsers } from '../../../util/store/reducers/room'
import { SidemenuChange,SidemenuType, Showmenu } from '../../../util/store/reducers/feature'
import { useNavigate } from 'react-router'

type Props = {

}

const Navbar: React.FC<Props> = (props) => {

    const user = useSelector(UserData)
    const room = useSelector(RoomInfo)
    const roomUsers = useSelector(RoomUsers)

    const showmenu = useSelector(Showmenu)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const SideMeunHandler  = (type:string) =>{
        dispatch(SidemenuChange()) 
        dispatch(SidemenuType(type))
    }


    return (
        <div>

            <div id='navbar' className='bg-primary '>
                <div className='container'>
                    <div className='row'>


                        {showmenu ? <div className='col-md-4 flex  border_right'>



                        </div>
                            : ''
                        }

                        <div className='col-md flex center between border_right'>

                            <div className='flex center'>
                                <i className="fa-solid fa-ellipsis-vertical logo_cdn click" onClick={()=>{SideMeunHandler('detail')}}></i>
                                <i className="fa-solid fa-magnifying-glass logo_cdn click" onClick={()=>{SideMeunHandler('search')}}></i>
                            </div>
                            <div className='flex center user_name_box_small'>
                                <div className='red user_name_box user_name_box_small'>
                                    <h3>{room.name}</h3>
                                    <div className='red flex'>
                                        {roomUsers.length > 0 ? roomUsers.map((p, index) => {
                                            return <p key={index}>,{p.name}</p>
                                        }) : <p>group users</p>}
                                     
                                    </div>
                                </div>
                                <img  src={room.imageUrl?room.imageUrl:"images/defaultuser.png"} alt="" className='avatar' />
                            </div>

                        </div>

                        <div className='menu_space col-md-4 flex center between'>


                            <div>
                                <i className="fa-solid fa-ellipsis-vertical logo_cdn click"></i>
                                <i className="fa-brands fa-rocketchat logo_cdn click" onClick={() => navigate('/newroom')}></i>
                                {/* <img src="images/charmander.png" alt="" className='logo click' /> */}
                            </div>

                            <div className='flex center'>
                                <h2>{user.name}</h2>
                                <img src={user.image ? user.image : "images/defaultuser.png"} alt="" className='avatar' />
                            </div>


                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}
export default Navbar