import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import PokemonHome from './pokemonHome'
import PokeNavbar from './pokenavbar'
import PokeFooter from './pokefooter'
import PokemonProfile from './pokemonprofile'
import { Redirect, Route, Switch } from 'react-router-dom'
import './pokemon.css'

export default function PokemonContainer() {
    const [pokemonCount, setPokemonCount] = useState()
    const [selectedPokemon, setSelectedPokemon] = useState()

    return (
        <div style={{ backgroundColor: 'lightgrey', }}>
            <PokeNavbar
                setSelectedPokemon={ setSelectedPokemon }
            />
            <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
                <Container fluid>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to='/pokedex' />
                        </Route>
                        <Route exact path="/pokedex">
                            <PokemonHome
                                setPokemonCount={ setPokemonCount }
                                setSelectedPokemon={ setSelectedPokemon }
                            />
                        </Route>
                        <Route exact path={ `/pokemon/${selectedPokemon}` }>
                            <PokemonProfile pokemon={ selectedPokemon } />
                        </Route>
                    </Switch>
                </Container>
            </div>
            <PokeFooter pokemonCount={ pokemonCount } />
        </div>
    )
}