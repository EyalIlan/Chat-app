import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { sideMenuType } from '../../../util/store/reducers/feature'
import { RoomMessages,RoomUsers } from '../../../util/store/reducers/room'
import { MessageIF } from '../../../util/interface/interface'


import './sideMenu.css'

interface Props {
    MenuType?: string
}

const SideMenu: React.FC<Props> = ({ MenuType }) => {


    const [searchTerm, SetSearchTerm] = useState('')
    const [filterMessages, SetFilterMessages] = useState<MessageIF[]>([])

    const menuType = useSelector(sideMenuType)
    const messages = useSelector(RoomMessages)
    const users = useSelector(RoomUsers)


    const searchHandler = (term: string) => {

        SetSearchTerm(term)


        if(term !== ''){
            
                    let FilterMessage = messages.filter(p => {
                        return p.message.search(term) !== -1 && term.length >=2
                    })
                    SetFilterMessages(FilterMessage)
        }

    }


    let menu;

    if (menuType === 'search') {
        menu = (
            <div >

                <div className='message'>
                    <input type="text" className='input' value={searchTerm} placeholder='search' onChange={(e) => { searchHandler(e.target.value) }} />
                </div>
                <div>

                    {filterMessages.map((p: MessageIF, index: number) => {
                        return (
                            <div key={index}>
                                <div className='chat_userbox' >
                                    <div>
                                        <div className='chat_userbox_title'>
                                            <p>date</p>
                                            {/* <h5>{p.message}</h5> */}
                                        </div>
                                        <p>{p.message}</p>
                                    </div>

                                </div>
                                <hr />
                            </div>
                        )

                    })}

                </div>

            </div>
        )
    } else if (menuType === 'detail') {
        menu = (
        <div>

        <div className='box'>
            <div className='flex flex-column justify-content-center align-items-center'>
            <img className='box_avatar_image' src="/images/avatarImage.png" alt="" />
            <h2>שם חדר</h2>
            <span className='medium_text'><p>שם</p></span>
            </div>
            {/* <hr className='bg-white box_line'/> */}
        </div>

        <div className='box'>

                {users.map((p,index) =>{
                    return (
                        <div key={index}>
                        <div className='chat_userbox' >
                          <div>
                            <div className='chat_userbox_title'>
                              <h5>{p.name}</h5>
                            </div>
                            <p>message</p>
                          </div>
                          <img src={p.image?p.image:"/images/happiness.png"}  alt="image" />
                        </div>
                        <hr />
                      </div>
                    ) 
                })}

        </div>


        </div>  
        )
    }


    return (
        <div>
            {menu}
        </div>
    )
}




export default SideMenu