import React from 'react'
import pokeball from '../../../assets/media/pokeball.png'
import { GENERAL } from '../../language-map'
import './navbar.less'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='navbar__title'>
                <img alt="" src={ pokeball } draggable={ false } />
                <div className="navbar__title__header">
                    { GENERAL.pokedex }
                </div>
                <img alt="" src={ pokeball } draggable={ false } />
            </div>
        </div>
    )
}

export default Navbar
