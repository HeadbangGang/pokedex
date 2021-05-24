import React, { useEffect, useState, useRef, useContext } from 'react'
import { Navbar, Button, Form, FormControl, Overlay, Popover, Toast } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import pokeball from '../media/pokeball.png'
import userIcon from '../media/user-icon.png'
import { UserContext } from '../providers/userprovider'

export default function PokeNavbar({ error, selectedPokemonData, setError, setSelectedPokemon, setSelectedPokemonData }) {
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
        <Navbar style={{backgroundColor: 'red'}} expand="lg" fixed="top">
            <Toast
                autohide
                show={ !!error }
                delay={ 5000 }
                style={{ position: 'absolute', top: '20px', right: '20px' }}
                onClose={() => setError(null)}
            >
                <Toast.Header>
                    <strong className="mr-auto">ERROR</strong>
                </Toast.Header>
                <Toast.Body>{ error }</Toast.Body>
            </Toast>
            <Navbar.Brand href='/pokedex' style={{ color: 'white' }}>
                <img src={ pokeball } style={{ height: '50px', width: '50px', margin: '0 10px 0 0' }} draggable={ false } />
                    Pokédex
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
                        onChange={(e) => setSearchData(e.target.value.trim())}
                        placeholder="Search Pokémon"
                        value={ searchData }
                        ref={ overlayTarget }
                        type="text"
                    />
                    <Button
                        onClick={(event) => {
                            fetchPokemon(event, searchData, setSearchData, setSelectedPokemon, setSelectedPokemonData, setShowOverlay, setOverlayParams)
                        } }
                        variant="outline-dark"
                        style={{ margin: '5px 10px 5px 0' }}
                    >
                    Search
                    </Button>
                </Form>
                { userContext?.email && userContext?.username
                    ? <input
                        type="image"
                        src={ userContext?.photoURL || userIcon }
                        style={{ height: '35px', width: '35px', border: '1px solid black', borderRadius: '50%' }}
                        onClick={() => history.push('/account/profile') }
                    />
                    : <Button variant="outline-dark" onClick={()=> history.push('/account/sign-in')}>Sign Up/Sign In</Button>
                }
            </Navbar.Collapse>
            <Overlay
                containerPadding={ 20 }
                placement="bottom-start"
                rootClose
                onHide={() => setShowOverlay(false)}
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

async function fetchPokemon(e, searchData, setSearchData, setSelectedPokemon, setSelectedPokemonData, setShowOverlay, setOverlayParams) {
    e.preventDefault()
    if (searchData !== '') {
        searchData = searchData.toLowerCase()
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchData}`)
        if (res.status === 200){
            await res.json().then(function (data) {
                setSelectedPokemonData(data)
                setSelectedPokemon(searchData)
                setSearchData('')
            })
        } else {
            setShowOverlay(true)
            setOverlayParams({
                message: 'This Pokémon does not exist, please search for a Pokémon that exists in the National Pokédex'
            })
        }
    } else {
        setShowOverlay(true)
        setOverlayParams({
            message: 'Enter a Pokémon Name'
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