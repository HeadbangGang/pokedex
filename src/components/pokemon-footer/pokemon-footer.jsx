import React, { useContext } from 'react'
import { Navbar } from 'react-bootstrap'
import PropTypes from 'prop-types'
import pokeball from '../../media/pokeball.png'
import { PokemonCountContext } from '../../providers/pokemon-count'
import { GENERAL } from '../../language-map'
import './pokemon-footer.less'

export default function PokemonFooter () {
    const date = new Date
    const pokemonCount = useContext(PokemonCountContext)

    return (
        <Navbar bg="dark" fixed="bottom" className="navbar-container-footer">
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
            { `${ GENERAL.copyright } ${ date.getFullYear() } ${ GENERAL.name }`}
            { pokemonCount &&
                <div className="ml-auto">
                    {`${ GENERAL.pokedexCountHeader } ${ pokemonCount }` }
                </div> }
        </Navbar>
    )
}

PokemonFooter.propTypes = {
    error: PropTypes.string,
    setError: PropTypes.func
}