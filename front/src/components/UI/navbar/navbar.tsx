import React from 'react'
import './navbar.css'

type Props = {}

const Navbar: React.FC<Props> = (props) => {
    return (
        <div >

            <div id='navbar' className='bg-primary '>
                <div className='container'>
                    <div className='row'>

                        <div className='col-md flex center between border_right'>
                            <div>
                                <img src="images/snorlax.png" alt="" className='logo' />
                                <img src="images/pikachu.png" alt="" className='logo' />
                            </div>
                            <div className='flex center'>
                                <div className='message_box'>
                                    <h3>חן</h3>
                                    <p>חןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןןן</p>
                                </div>
                                <img src="images/defaultuser.png" alt="" className='avatar' />
                            </div>

                        </div>

                        <div className='menu_space col-md-3 flex center between'>


                        <div>
                            <img src="images/eevee.png" alt="" className='logo' />
                            <img src="images/squirtle.png" alt="" className='logo' />
                            <img src="images/charmander.png" alt="" className='logo' />
                         </div>

                        <div className='flex center'>
                                <img src="images/defaultuser.png" alt="" className='avatar' />
                        </div>
                        

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Navbar