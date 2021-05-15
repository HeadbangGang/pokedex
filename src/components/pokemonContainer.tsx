/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Container } from 'react-bootstrap'
import PokemonHome from './pokemonHome'
import PokeNavbar from './pokenavbar'
import PokeFooter from './pokefooter'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import './pokemon.css'

export default class PokemonContainer extends React.Component {
    render():any {
        return (
            <Router>
                <PokeNavbar />
                <div style={{ backgroundColor: 'lightgrey'}}>
                    <Container fluid>
                        <Switch>
                            <Route exact path="/pokedex" component={PokemonHome} />
                            <Route exact path="/">
                                <Redirect to='/pokedex' />
                            </Route>
                        </Switch>
                    </Container>
                </div>
                <PokeFooter />
            </Router>
        )
    }
}