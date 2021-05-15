/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap'
import pokeball from '../media/pokeball.png'

export default class PokeNavbar extends React.Component {
    
    state = {
        searchData: ''
    }

    render():any{
        
        return (
            <Navbar style={{backgroundColor: 'red'}} expand="lg">
                <Navbar.Brand href="#home" style={{ color: 'white' }}>
                    <img src={pokeball} style={{ height: '50px', width: '50px', margin: '0 10px 0 0' }} draggable={ false } />
                    Pokédex
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/pokedex">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
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

async function fetchPokemon(e: any, pokemon: string) {
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