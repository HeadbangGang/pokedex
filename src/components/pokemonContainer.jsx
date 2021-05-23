import React, { useState } from 'react'
import UserProvider from '../providers/userprovider'
import PokemonHome from './pokemonHome'
import PokeNavbar from './pokenavbar'
import PokeFooter from './pokefooter'
import PokemonProfile from './pokemonprofile'
import ErrorPage from './errorpage'
import SignUp from './authentication/signup'
import SignIn from './authentication/signin'
import PasswordReset from './authentication/passwordreset'
import ProfilePage from './authentication/profilepage'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import './pokemon.css'

export default function PokemonContainer() {
    const pageURL = window.location.href
    const [pokemonCount, setPokemonCount] = useState()
    const [selectedPokemon, setSelectedPokemon] = useState(pageURL.includes('pokemon') && pageURL.substr(pageURL.lastIndexOf('/') + 1).toLowerCase())
    const [selectedPokemonData, setSelectedPokemonData] = useState()
    const [error, setError] = useState()

    return (
        <UserProvider>
            <Router basename="/">
                <div style={{ backgroundColor: 'lightgrey' }}>
                    <PokeNavbar
                        selectedPokemonData={ selectedPokemonData }
                        setSelectedPokemon={ setSelectedPokemon }
                        setSelectedPokemonData={ setSelectedPokemonData }
                        setError={ setError }
                        error={ error }
                    />
                    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
                        <Switch>
                            <Route exact path="/pokedex">
                                <PokemonHome
                                    setPokemonCount={ setPokemonCount }
                                    setSelectedPokemon={ setSelectedPokemon }
                                />
                            </Route>
                            <Route exact path={ `/pokemon/${selectedPokemon}` }>
                                <PokemonProfile
                                    pokemon={ selectedPokemon }
                                    pokemonData={ selectedPokemonData }
                                    setPokemonData={ setSelectedPokemonData }
                                />
                            </Route>
                            <Route exact path="/account/sign-up">
                                <SignUp
                                    setError={ setError }
                                />
                            </Route>
                            <Route exact path="/account/sign-in">
                                <SignIn
                                    setError={ setError }
                                />
                            </Route>
                            <Route exact path="/account/password-reset">
                                <PasswordReset
                                    setError={ setError }
                                />
                            </Route>
                            <Route exact path="/account/profile">
                                <ProfilePage />
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
                        error={ error }
                        setError={ setError }
                    />
                </div>
            </Router>
        </UserProvider>
    )
}