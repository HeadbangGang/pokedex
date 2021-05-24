import React, { useContext } from 'react'
import { Navbar } from 'react-bootstrap'
import PropTypes from 'prop-types'
import pokeball from '../media/pokeball.png'
import { PokemonCountContext } from '../providers/pokemoncount'

export default function PokeFooter() {
    const date = new Date

    const pokemonCount = useContext(PokemonCountContext)

    return (
        <Navbar bg="dark" fixed="bottom">
            <Navbar.Brand href="/pokedex">
                <img
                    src={ pokeball }
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt=''
                    draggable={ false }
                />
            </Navbar.Brand>
            <span style={{color: 'white'}}>
                © {date.getFullYear()} Tayden Flitcroft
            </span>
            { pokemonCount &&
                <div className="ml-auto" style={{color: 'white'}}>
                    National Pokédex Count: { pokemonCount }
                </div> }
        </Navbar>
    )
}

PokeFooter.propTypes = {
    error: PropTypes.string,
    setError: PropTypes.func
}