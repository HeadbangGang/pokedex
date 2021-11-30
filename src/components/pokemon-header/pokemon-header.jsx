import React from 'react'
import { Toast } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import pokeball from '../../media/pokeball.png'
import { GENERAL, ERRORS } from '../../language-map'
import './pokemon-header.less'

export default function PokemonHeader ({ error, setError, setShowShiny, showShiny }) {
    const history = useHistory()

    return (
        <div className='navbar-container'>
            <div className="navbar-container__title-container" expand="lg" fixed="top">
                <Toast
                    autohide
                    className="navbar-toast-container"
                    delay={ 5000 }
                    onClose={ () => setError(null) }
                    show={ !!error }
                >
                    <Toast.Header>
                        <strong className="mr-auto">
                            { ERRORS.error }
                        </strong>
                    </Toast.Header>
                    <Toast.Body>{ error }</Toast.Body>
                </Toast>
                <a
                    className="navbar-logo__button"
                    href=''
                    onClick={ () => {
                        history.replace('/pokedex')
                    } }
                >
                    <img src={ pokeball } className="navbar-logo" draggable={ false } />
                </a>
                <a
                    href=''
                    onClick={ () => {
                        history.replace('/pokedex')
                    } }
                >
                    <div className="navbar-brand-name">
                        { GENERAL.pokedex }
                    </div>
                </a>
                <a
                    className="navbar-logo__button"
                    href=''
                    onClick={ () => {
                        history.replace('/pokedex')
                    } }
                >
                    <img src={ pokeball } className="navbar-logo" draggable={ false } />
                </a>
            </div>
            {/* would like to track shiny state using a cookie value instead */}
            <div style={{ float: 'right' }}>
                <input id="shiny-pokemon" type="checkbox" onChange={ ()=> setShowShiny(!showShiny) } style={{ marginRight: '5px' }} />
                <label htmlFor="shiny-pokemon">Show Shiny Pokemon</label>
            </div>
        </div>
    )
}

PokemonHeader.propTypes={
    error: PropTypes.string,
    setError: PropTypes.func,
    setShowShiny: PropTypes.func,
    showShiny: PropTypes.bool
}