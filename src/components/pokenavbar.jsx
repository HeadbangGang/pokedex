/* eslint-disable no-console */
import React, { useState, useRef } from 'react'
import { Navbar, Button, Form, FormControl, Overlay, Popover } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import pokeball from '../media/pokeball.png'

export default function PokeNavbar({ setSelectedPokemon }) {
    const history = useHistory()
    const [searchData, setSearchData] = useState('')
    const [showOverlay, setShowOverlay] = useState(false)
    const [overlayParams, setOverlayParams] = useState({})
    const overlayTarget = useRef(null)

    return (
        <Navbar style={{backgroundColor: 'red'}} expand="lg" fixed="top">
            <Navbar.Brand href={'/pokedex'} style={{ color: 'white' }}>
                <img src={pokeball} style={{ height: '50px', width: '50px', margin: '0 10px 0 0' }} draggable={ false } />
                    Pokédex
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form
                    className="ml-auto"
                    inline
                    onSubmit={ (event) => fetchPokemon(event, searchData, history, setSelectedPokemon, setShowOverlay, setOverlayParams) }
                >
                    <FormControl
                        type="text"
                        placeholder="Search Pokémon"
                        className="mr-sm-2"
                        onChange={(e) => setSearchData(e.target.value)}
                        ref={ overlayTarget }
                    />
                    <Button
                        variant="outline"
                        onClick={(event) => fetchPokemon(event, searchData, history, setSelectedPokemon, setShowOverlay, setOverlayParams)}
                        style={{color: 'black', borderColor: 'black' }}
                    >
                            Search
                    </Button>
                </Form>
            </Navbar.Collapse>
            <Overlay
                containerPadding={20}
                onExiting={() => setShowOverlay(false)}
                placement="bottom-start"
                rootClose
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

async function fetchPokemon(e, pokemon, history, setSelectedPokemon, setShowOverlay, setOverlayParams) {
    e.preventDefault()
    if (pokemon !== '') {
        setSelectedPokemon(pokemon)
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        if (res.status === 200){
            history.push('/pokemon/' + pokemon)
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
    setSelectedPokemon: PropTypes.func
}