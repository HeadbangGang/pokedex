/* eslint-disable no-console */
import React from 'react'
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap'
import pokeball from '../media/pokeball.png'

export default class PokeNavbar extends React.Component {

    state = {
        searchData: ''
    }

    render() {
        return (
            <Navbar style={{backgroundColor: 'red'}} expand="lg">
                <Navbar.Brand href={'/pokedex'} style={{ color: 'white' }}>
                    <img src={pokeball} style={{ height: '50px', width: '50px', margin: '0 10px 0 0' }} draggable={ false } />
                    Pokédex
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/pokedex">Home</Nav.Link>
                    </Nav>
                    <Form inline onSubmit={ (event) => fetchPokemon(event, this.state.searchData) }>
                        <FormControl
                            type="text"
                            placeholder="Search Pokémon"
                            className="mr-sm-2"
                            onChange={(e) => this.setState({searchData: e.target.value})}
                        />
                        <Button
                            variant="outline"
                            onClick={(event) => fetchPokemon(event, this.state.searchData)}
                            style={{color: 'black', borderColor: 'black' }}
                        >
                            Search
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

async function fetchPokemon(e, pokemon) {
    e.preventDefault()
    if (pokemon !== '') {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        if (res.status === 200){
            res.json().then(function (data) {
                console.log(data) //Need to use this data to navigate to the next page
            })
        } else {
            console.log(`${res.status}: Bad Request`)
        }
    } else {
        alert('Enter a Pokemon Name')
    }
}