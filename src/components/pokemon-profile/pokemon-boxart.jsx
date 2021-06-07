import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import close from '../../media/close-button.svg'

export const PokemonProfileBoxArt = ({
    alt,
    pokemon,
    sprite
}) => {
    PokemonProfileBoxArt.propTypes={
        alt: PropTypes.string,
        pokemon: PropTypes.string,
        sprite: PropTypes.string
    }
    const [openBoxArt, setOpenBoxArt] = useState(false)

    useEffect(() => {
        setOpenBoxArt(false)
    }, [pokemon])

    return (
        <>
            { openBoxArt &&
            <a onClick={ () => setOpenBoxArt(false) }>
                <img
                    className='pokemon-profile-close-button'
                    draggable={ false }
                    src={ close }
                />
            </a> }
            <a onClick={ () => setOpenBoxArt(true) }>
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