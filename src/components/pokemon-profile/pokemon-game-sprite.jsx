import React, { useState } from 'react'
import PropTypes from 'prop-types'
import close from '../../media/close-button.svg'

export default function PokemonGameSprite ({ alt, sprite }) {
    const [openBoxArt, setOpenBoxArt] = useState(false)
    return (
        <>
            {openBoxArt &&
            <a onClick={ () => setOpenBoxArt(!openBoxArt) }>
                <img
                    className='pokemon-profile-close-button'
                    draggable={ false }
                    src={ close }
                />
            </a>}
            <a onClick={ () => setOpenBoxArt(!openBoxArt) }>
                <img
                    alt={ alt }
                    className={ openBoxArt ? 'pokemon-profile-boxart-sprite-clicked' : 'pokemon-profile-boxart-sprite' }
                    draggable={ false }
                    src={ sprite }
                />
            </a>
        </>
    )
}

PokemonGameSprite.propTypes={
    alt: PropTypes.string,
    sprite: PropTypes.string
}