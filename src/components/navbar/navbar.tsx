import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import pokeball from '../../../assets/media/pokeball.png'
import { GENERAL } from '../../language-map'
import { PokemonDataContext } from '../../providers/pokemon-data'
import './navbar.less'

const Navbar = () => {
    const navigate = useNavigate()

    const { showShiny, setShowShiny } = useContext(PokemonDataContext)

    const pokeballButton = (
        <button onClick={ () => navigate('/', { replace: true })}>
            <img alt="" src={ pokeball } draggable={ false } />
        </button>
    )

    return (
        <>
            <div className='navbar'>
                <div className='navbar__title'>
                    { pokeballButton }
                    <button onClick={ () => navigate('/', { replace: true }) }>
                        <div className="navbar__title__header">
                            { GENERAL.pokedex }
                        </div>
                    </button>
                    { pokeballButton }
                </div>
            </div>
        </>
    )
}

export default Navbar