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
import PokemonCount from '../providers/pokemoncount'
import './stylesheets/pokemon-container.css'
import './authentication/authentication.css'

export default function PokemonContainer () {
    const pageURL = window.location.href
    const [selectedPokemon, setSelectedPokemon] = useState(pageURL.includes('pokemon') && pageURL.substr(pageURL.lastIndexOf('/') + 1).toLowerCase())
    const [selectedPokemonData, setSelectedPokemonData] = useState()
    const [error, setError] = useState()

    return (
        <UserProvider>
            <PokemonCount>
                <Router basename="/">
                    <div className="pokemon-container">
                        <PokeNavbar
                            selectedPokemonData={ selectedPokemonData }
                            setSelectedPokemon={ setSelectedPokemon }
                            setSelectedPokemonData={ setSelectedPokemonData }
                            setError={ setError }
                            error={ error }
                        />
                        <div className="pokemon-container-main-content">
                            <Switch>
                                <Route exact path="/pokedex">
                                    <PokemonHome
                                        setSelectedPokemon={ setSelectedPokemon }
                                    />
                                </Route>
                                <Route exact path={ `/pokemon/${ selectedPokemon }` }>
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
                            error={ error }
                            setError={ setError }
                        />
                    </div>
                </Router>
            </PokemonCount>
        </UserProvider>
    )
}