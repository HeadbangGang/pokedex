import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import PokemonHome from './pokemonHome'
import PokeNavbar from './pokenavbar'
import PokeFooter from './pokefooter'
import PokemonProfile from './pokemonprofile'
import ErrorPage from './errorpage'
import SignUp from './authentication/signup'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import './pokemon.css'

export default function PokemonContainer() {
    const pageURL = window.location.href
    const [pokemonCount, setPokemonCount] = useState()
    const [selectedPokemon, setSelectedPokemon] = useState(pageURL.includes('pokemon') && pageURL.substr(pageURL.lastIndexOf('/') + 1).toLowerCase())
    const [selectedPokemonData, setSelectedPokemonData] = useState()

    return (
        <Router basename="/">
            <div style={{ backgroundColor: 'lightgrey', }}>
                <PokeNavbar
                    selectedPokemonData={ selectedPokemonData }
                    setSelectedPokemon={ setSelectedPokemon }
                    setSelectedPokemonData={ setSelectedPokemonData }
                />
                <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
                    <Switch>
                        <Route exact path="/pokedex">
                            <Container fluid>
                                <PokemonHome
                                    setPokemonCount={ setPokemonCount }
                                    setSelectedPokemon={ setSelectedPokemon }
                                />
                            </Container>
                        </Route>
                        <Route exact path={ `/pokemon/${selectedPokemon}` }>
                            <PokemonProfile
                                pokemon={ selectedPokemon }
                                pokemonData={ selectedPokemonData }
                                setPokemonData={ setSelectedPokemonData }
                            />
                        </Route>
                        <Route exact path="/account/sign-up">
                            <SignUp />
                        </Route>
                        <Route exact path="/error">
                            <ErrorPage />
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/pokedex" />
                        </Route>
                    </Switch>
                </div>
                <PokeFooter
                    pokemonCount={ pokemonCount }
                />
            </div>
        </Router>
    )
}