import React, { useEffect, useState, useRef, useContext } from 'react'
import { Navbar, Button, Form, FormControl, Overlay, Popover, Toast } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import pokeball from '../media/pokeball.png'
import userIcon from '../media/user-icon.png'
import { UserContext } from '../providers/userprovider'
import { GENERAL, ERRORS, AUTHENTICATION } from './language-map'
import './stylesheets/header.css'

export default function PokeNavbar ({ error, selectedPokemonData, setError, setSelectedPokemon, setSelectedPokemonData }) {
    const history = useHistory()
    const overlayTarget = useRef(null)
    const userContext = useContext(UserContext ?? '')

    const [searchData, setSearchData] = useState('')
    const [showOverlay, setShowOverlay] = useState(false)
    const [overlayParams, setOverlayParams] = useState({})

    useEffect(() => {
        if (searchData && selectedPokemonData) {
            history.push('/pokemon/' + searchData)
        }
    }, [selectedPokemonData])

    return (
        <Navbar className="navbar-container" expand="lg" fixed="top">
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
            <Navbar.Brand href='/pokedex' className="navbar-brand-name">
                <img src={ pokeball } className="navbar-logo" draggable={ false } />
                { GENERAL.pokedex }
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form
                    className="ml-auto"
                    inline
                    onSubmit={ (event) => {
                        fetchPokemon(event, searchData, setSearchData, setSelectedPokemon, setSelectedPokemonData, setShowOverlay, setOverlayParams)
                    } }
                >
                    <FormControl
                        className="mr-sm-2"
                        onChange={ (e) => setSearchData(e.target.value.trim()) }
                        placeholder={ GENERAL.searchPokemon }
                        value={ searchData }
                        ref={ overlayTarget }
                        type="text"
                    />
                    <Button
                        className="navbar-search-button"
                        onClick={ (event) => {
                            fetchPokemon(event, searchData, setSearchData, setSelectedPokemon, setSelectedPokemonData, setShowOverlay, setOverlayParams)
                        } }
                        variant="outline-dark"
                    >
                        { GENERAL.search }
                    </Button>
                </Form>
                { userContext?.email && userContext?.username
                    ? <input
                        className="navbar-user-icon"
                        onClick={ () => history.push('/account/profile') }
                        src={ userContext?.photoURL || userIcon }
                        type="image"
                    />
                    : <Button variant="outline-dark"
                        className="navbar-sign-in-button"
                        onClick={ () => {
                            history.push('/account/sign-in')
                        } }
                    >
                        { AUTHENTICATION.signIn }
                    </Button>
                }
            </Navbar.Collapse>
            <Overlay
                containerPadding={ 20 }
                placement="bottom-start"
                rootClose
                onHide={ () => setShowOverlay(false) }
                show={ showOverlay }
                target={ overlayTarget }
            >
                <Popover id="popover-contained">
                    <Popover.Content>
                        { overlayParams.message }
                    </Popover.Content>
                </Popover>
            </Overlay>
        </Navbar>
    )
}

async function fetchPokemon (e, searchData, setSearchData, setSelectedPokemon, setSelectedPokemonData, setShowOverlay, setOverlayParams) {
    e.preventDefault()
    if (searchData !== '') {
        searchData = searchData.toLowerCase()
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ searchData }`)
        if (res.status === 200){
            await res.json().then(function (data) {
                setSelectedPokemonData(data)
                setSelectedPokemon(searchData)
                setSearchData('')
            })
        } else {
            setShowOverlay(true)
            setOverlayParams({
                message: ERRORS.pokemonDoesNotExist
            })
        }
    } else {
        setShowOverlay(true)
        setOverlayParams({
            message: ERRORS.enterPokemon
        })
    }
}

PokeNavbar.propTypes ={
    error: PropTypes.string,
    selectedPokemon: PropTypes.string,
    selectedPokemonData: PropTypes.object,
    setError: PropTypes.func,
    setSelectedPokemon: PropTypes.func,
    setSelectedPokemonData: PropTypes.func
}