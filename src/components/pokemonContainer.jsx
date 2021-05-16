import React from 'react'
import { Container } from 'react-bootstrap'
import PokemonHome from './pokemonHome'
import PokeNavbar from './pokenavbar'
import PokeFooter from './pokefooter'
import Pokemon from './pokemon'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import './pokemon.css'

export default class PokemonContainer extends React.Component {
    render() {
        const history = createBrowserHistory()
        return (
            <Router history={ history }>
                <PokeNavbar />
                <div style={{ backgroundColor: 'lightgrey'}}>
                    <Container fluid>
                        <Switch>
                            <Route exact path="/">
                                <Redirect to='/pokedex' />
                            </Route>
                            <Route exact path="/pokedex" component={PokemonHome} />
                            <Route exact path='/pokemon' component={Pokemon} />
                        </Switch>
                    </Container>
                </div>
                <PokeFooter />
            </Router>
        )
    }
}